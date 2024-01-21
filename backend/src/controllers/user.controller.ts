import { Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { FirstSetupService } from 'src/services/firstSetup.service';
import CMSController from './base.controller';
import { ManageUsersGuard } from 'src/guards/manageUsers.guard';

@Controller('users')
export class UserController extends CMSController {
  response: any = null

  constructor(private readonly setupService: FirstSetupService) { super() }
  @Get()
  @UseGuards(ManageUsersGuard)
  async all() {
    const users = await User.find();
    return this.defaultOk('success', users)
  }

  @Get(':userId')
  @UseGuards(ManageUsersGuard)
  async show(@Param('userId') id: number) {
    const user = await User.findOneBy({ id: id });
    return this.defaultOk('success', user)
  }

  @Patch(':userId')
  @UseGuards(ManageUsersGuard)
  async update(@Req() request: Request, @Param('userId') id: number) {
    const params: Partial<User> = request.body.user;
    const user = await User.findOneBy({ id: id });
  
    user.grantParams(params);
    await user.save();
    await user.reload();

    return this.defaultOk('success', user)
  }

  @Post()
  async create(@Req() request: Request) {
    const params: Partial<User> = request.body.user;
    const userExists = await User.findOneBy({ isActive: true });
    let newUser: User = null;
    
    
    if (!userExists) {
      newUser = new User(params);
      await this.setupService.setup(newUser)

      await newUser.reload();
      const payload = this.jwtService.encode(this.jwtService.payloadFromUser(newUser));
      return this.response = this.defaultOk('ok', payload);
    }

    const validation = await this.failedValidation(params);
    if(validation) return this.response = validation;

    const user = await this.jwtService.getUserFromJwt(request.headers.authorization, { relations: ['role'] });
    if(!user || !user.roles?.find(role => role.canManageUsers)) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    newUser = new User(params);
    await newUser.save();
    return this.response = this.defaultOk();
  }

  async failedValidation(params: Partial<User>): Promise<any> {
    const emailInUse = await User.findOneBy({ email: params.email })
    if (emailInUse) return this.failedFields(['email']);
    else return null;
  }
}
