import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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

  @Column({ nullable: true })
  fatPercentage?: number;

  @Column({ nullable: true })
  musclePercentage?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.weights)
  user: User;
}
