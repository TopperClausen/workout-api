import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { EncryptionService } from 'src/services/encryption.service';

@Entity()
export class User extends BaseEntity {
  private encryptionService = new EncryptionService();

  constructor(params: Partial<User> = null) {
    super();

    if (params) this.grantParams(params);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordDigest: string;

  @Column({ default: false })
  shouldChangePassword: boolean;

  public set password(value: string) {
    this.passwordDigest = this.encryptionService.encrypt(value);
  }

  public get password() {
    return this.passwordDigest;
  }
}
