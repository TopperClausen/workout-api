import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JWTService } from "src/services/jwt.service";

@Injectable()
export class ManageRolesGuard implements CanActivate {
    private jwtService = new JWTService();

    async canActivate( context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;

        const user = await this.jwtService.getUserFromJwt(token, { relations: ['roles'] });
        const canManageRoles = user.roles.find(role => role.canManageRoles);
        return !!canManageRoles;
    }
}