import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Weight extends BaseEntity {
  constructor(params: Partial<Weight> = null) {
    super();

    if (params) this.grantParams(params);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weight?: number;

  @Column()
  fatPercentage?: number;

  @Column()
  musclePercentage?: number;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.weights)
  user: User;
}
