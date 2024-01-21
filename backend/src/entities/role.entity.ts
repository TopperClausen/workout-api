import { Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { CMSBaseEntity } from './base.entity';

@Entity()
export class Role extends CMSBaseEntity {
    constructor(params: Partial<Role> = null) {
        super();
        if(params) this.grantParams(params);
    }

    @PrimaryGeneratedColumn() id: number;
    @Column() name: string;
    @Column({ default: false }) canManageUsers: boolean;
    @Column({ default: false }) canManageRoles: boolean;

    @ManyToMany(() => User)
    @JoinTable({ name: 'user_role' })
    users: User[];

    grantAllPermissions() {
        this.canManageUsers = true;
    }
}