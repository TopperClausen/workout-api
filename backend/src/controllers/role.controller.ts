import { Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Req, Request, UseGuards } from "@nestjs/common";
import CMSController from "./base.controller"
import { Role } from "src/entities/role.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { request } from "http";
import { ManageRolesGuard } from "src/guards/manageRoles.guard";

@Controller('/roles')
@UseGuards(AuthGuard)
export class RoleController extends CMSController {

    @Get()
    async all(@Req() request: Request) {
        const roles = (await Role.find()).filter(role => role.name != 'Super Admin');
        return roles;
    }

    @Get(':id')
    async show(@Param('id') id: number) {
        const role = await Role.findOneBy({ id: id })
        return this.defaultOk('success', role)
    }
    
    @Patch(':id')
    @UseGuards(ManageRolesGuard)
    async update(@Param('id') id: number, @Request() request: Request) {
        const params: Partial<Role> = (request.body as any).role;
        const role = await Role.findOneBy({ id: id });

        role.grantParams(params);
        await role.save();
        
        return this.defaultOk('success', role)
    }

    @Post()
    @UseGuards(ManageRolesGuard)
    async create(@Req() request: Request) {
        const params = (request.body as any).role as Partial<Role>
        const existingRole = await Role.findOneBy({ name: params.name })

        if(existingRole) {
            return this.failedFields(['name'], `Role ${params.name} already in use`);
        }
        const newRole = new Role(params);
        await newRole.save();
        await newRole.reload();

        return this.defaultOk('Success', newRole)
    }

    @Delete(':id')
    @UseGuards(ManageRolesGuard)
    async delete( @Param('id') id: number) {
        const role = await Role.findOneBy({ id: id })
        await role.remove();
        return this.defaultOk('success');
    }
}