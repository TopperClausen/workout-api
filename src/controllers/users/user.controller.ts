import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../entities/user.entity';
import CMSController from '../base.controller';
import { userJwtMatchGuard } from 'src/guards/userJwtMatch.guard';

@Controller('users')
export class UserController extends CMSController {
  response: any = null;
  @Get()
  async all() {
    const users = await User.find();
    return this.defaultOk('success', users);
  }

  @Get(':userId')
  @UseGuards(userJwtMatchGuard)
  async show(@Param('userId') id: number) {
    const user = await User.findOneBy({ id: id });
    return this.defaultOk('success', user);
  }

  @Patch(':userId')
  @UseGuards(userJwtMatchGuard)
  async update(@Req() request: Request, @Param('userId') id: number) {
    const params: Partial<User> = request.body.user;
    const user = await User.findOneBy({ id: id });

    user.grantParams(params);
    await user.save();
    await user.reload();

    return this.defaultOk('success', user);
  }

  @Post()
  async create(@Req() request: Request) {
    const params: Partial<User> = request.body.user;
    const user: User = new User(params);

    try {
      await user.save();
      await user.reload();
      const payload = this.jwtService.payloadFromUser(user);
      const jwt = this.jwtService.encode(payload);
      return this.defaultOk('success', {
        jwt,
      });
    } catch (e) {
      return this.failedFields(['email'], 'failed');
    }
  }
}
