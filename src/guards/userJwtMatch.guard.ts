import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JWTService } from 'src/services/jwt.service';

@Injectable()
export class userJwtMatchGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) return false;

    const jwtService = new JWTService();

    const userId = request.params.userId;
    const decoded = await jwtService.getUserFromJwt(
      request.headers.authorization,
    );
    console.log(decoded);
    console.log(userId);
    if (decoded.id.toString() === userId) {
      return true;
    } else {
      return false;
    }
  }
}
