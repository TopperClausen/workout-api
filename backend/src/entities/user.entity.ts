import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { EncryptionService } from 'src/services/encryption.service';
import { CMSBaseEntity } from './base.entity';

@Entity()
export class User extends CMSBaseEntity {
    private encryptionService = new EncryptionService()

    constructor(params: Partial<User> = null) {
        super();

        if(params) this.grantParams(params);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    passwordDigest: string;

    @Column({ default: false })
    shouldChangePassword: boolean

    public set password(value: string) {
        this.passwordDigest = this.encryptionService.encrypt(value);
    }

    public get password() {
        return this.passwordDigest;
    }

    @Column({ default: true })
    isActive: boolean;
}
