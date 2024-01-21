import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JWTService } from "src/services/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {
    private jwtService = new JWTService();

    canActivate( context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;

        return !!this.jwtService.verify(token);
    }
}