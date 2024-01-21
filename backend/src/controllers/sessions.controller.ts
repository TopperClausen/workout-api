import { Controller, Post, Req, UnauthorizedException } from "@nestjs/common";
import CMSController from "./base.controller";
import { Request } from "express";
import { User } from "src/entities/user.entity";
import { EncryptionService } from "src/services/encryption.service";

interface Credentials {
    email: string,
    password: string
}

@Controller('/')
export class SessionsController extends CMSController {
    constructor(
        private readonly encryptionService: EncryptionService
        ) { super(); }

    @Post('login') 
    async login(@Req() request: Request) {
        const params: Credentials = request.body;
        const user = await User.findOneBy({ email: params.email, isActive: true });
        
        if(!user) throw new UnauthorizedException('Unauthorized');
        if(!this.encryptionService.compare(user.password, params.password)) throw new UnauthorizedException('Unauthorized');

        const payload = this.jwtService.payloadFromUser(user);
        return this.defaultOk('success', { jwt: this.jwtService.encode(payload) });
    }
}
