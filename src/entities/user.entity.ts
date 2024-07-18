import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { EncryptionService } from 'src/services/encryption.service';
import { Weight } from './weight.entity';

const encryptionService = new EncryptionService();

@Entity()
export class User extends BaseEntity {
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

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Weight, (weight) => weight.user)
  weights: Weight[];

  public set password(value: string) {
    this.passwordDigest = encryptionService.encrypt(value);
  }

  public get password() {
    return this.passwordDigest;
  }
}
