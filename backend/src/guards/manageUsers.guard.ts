import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JWTService } from "src/services/jwt.service";

@Injectable()
export class ManageUsersGuard implements CanActivate {
    private jwtService = new JWTService();

    async canActivate( context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;

        const user = await this.jwtService.getUserFromJwt(token, { relations: ['roles'] });
        const canManageUsers = user.roles.find(role => role.canManageUsers);
        
        if (request.params.userId == user.id) return true;
        return canManageUsers ? true : false;
    }
}