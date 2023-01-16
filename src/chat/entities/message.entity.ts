import { Field, ObjectType } from '@nestjs/graphql';
import { Users } from 'src/users/entities/users.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Messages {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  message: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  createdAt: string;

  @ManyToOne(() => Users)
  author: Users;
}
