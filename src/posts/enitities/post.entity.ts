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

  @Column({ nullable: false })
  @Field({ nullable: false })
  title: string;

  @Column()
  @Field()
  text: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  image: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  tag: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  minutesToRead: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  userId: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  updatedAt: string;

  @ManyToOne(() => Users, (user) => user.posts)
  user: Users;

  @OneToMany(() => Comments, (comments) => comments.posts)
  @Field(() => [Comments])
  comments: Comments[];
}
