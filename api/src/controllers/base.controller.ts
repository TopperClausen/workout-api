import { JWTService } from 'src/services/jwt.service';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';

export default class BaseController {
  jwtService = new JWTService();

  async currentUser(request: Request): Promise<User> {
    return await this.jwtService.getUserFromJwt(request.headers.authorization);
  }

  defaultOk(message: string = 'ok', data = null) {
    return { message: message, data };
  }

  failedFields(failedFields: string[] = [], message: string = 'failed') {
    return { message, failedFields };
  }
}
