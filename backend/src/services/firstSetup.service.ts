import { Role } from "src/entities/role.entity";
import { User } from "src/entities/user.entity";

export class FirstSetupService {
    async setup(user: User, saved: boolean = false) {
        if(!saved) await user.save();
        await this.setupRoles(user);
    }

    async setupRoles(user: User) {
        const superAdmin = new Role({ name: "Super Admin"})
        superAdmin.grantAllPermissions();
        await superAdmin.save();
        user.roles = [superAdmin]
        user.save();
    }
}