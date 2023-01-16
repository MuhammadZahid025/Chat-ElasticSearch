import { Field, ObjectType } from '@nestjs/graphql';
import { Users } from 'src/users/entities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Comments } from './comments.entity';

@Entity()
@ObjectType()
export class Posts {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  text: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  userId: number;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  updatedAt: string;

  @ManyToOne(() => Users, (user) => user.posts)
  user: Users;

  @OneToMany(() => Comments, (comments) => comments.posts)
  @Field(() => [Comments], { nullable: 'itemsAndList' })
  comments: Comments[];
}
