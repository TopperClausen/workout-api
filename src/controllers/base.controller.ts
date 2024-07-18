import { JWTService } from 'src/services/jwt.service';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

export default class BaseController {
  jwtService = new JWTService();

  async currentUser(request: Request, overload?: any): Promise<User> {
    return await this.jwtService.getUserFromJwt(request.headers.authorization, overload);
  }

  defaultOk(message: string = 'ok', data = null) {
    return { message: message, data };
  }

  notFound(message: string = 'not found', data = null) {
    throw new HttpException({ message, data }, HttpStatus.NOT_FOUND);
  }

  defaultError(message: string = 'error', data = null) {
    throw new HttpException({ message: message, data }, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  failedFields(failedFields: string[] = [], message: string = 'failed') {
    throw new HttpException({ message, failedFields }, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
