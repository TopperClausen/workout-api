import { Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import CMSController from './base.controller';

@Controller('users')
export class UserController extends CMSController {
  response: any = null

  constructor() { super() }
  @Get()
  async all() {
    const users = await User.find();
    return this.defaultOk('success', users)
  }

  @Get(':userId')
  async show(@Param('userId') id: number) {
    const user = await User.findOneBy({ id: id });
    return this.defaultOk('success', user)
  }

  @Patch(':userId')
  async update(@Req() request: Request, @Param('userId') id: number) {
    const params: Partial<User> = request.body;
    const user = await User.findOneBy({ id: id });
  
    user.grantParams(params);
    await user.save();
    await user.reload();

    return this.defaultOk('success', user)
  }

  @Post()
  async create(@Req() request: Request) {
    const params: Partial<User> = request.body;
    const userExists = await User.findOneBy({ isActive: true });

    const validation = await this.failedValidation(params);
    if(validation) return this.response = validation;

    const newUser = new User(params);
    await newUser.save();
    return this.response = this.defaultOk();
  }

  async failedValidation(params: Partial<User>): Promise<any> {
    const emailInUse = await User.findOneBy({ email: params.email })
    if (emailInUse) return this.failedFields(['email']);
    else return null;
  }
}
