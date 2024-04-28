import { Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';
import { EncryptionService } from 'src/services/encryption.service';
import BaseController from './base.controller';

interface Credentials {
  email: string;
  password: string;
}

@Controller('/')
export class SessionsController extends BaseController {
  constructor(private readonly encryptionService: EncryptionService) {
    super();
  }

  @Post('login')
  async login(@Req() request: Request) {
    const params: Credentials = request.body.user;
    const user = await User.findOneBy({ email: params.email });

    if (!user) throw new UnauthorizedException('Unauthorized');
    if (!this.encryptionService.compare(user.password, params.password))
      throw new UnauthorizedException('Unauthorized');

    const payload = this.jwtService.payloadFromUser(user);
    return this.defaultOk('success', { jwt: this.jwtService.encode(payload) });
  }
}
