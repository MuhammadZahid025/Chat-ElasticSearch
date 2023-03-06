import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Posts } from 'src/posts/enitities/post.entity';
import { Comments } from 'src/posts/enitities/comments.entity';
import { Role } from '../enums/role.enum';

registerEnumType(Role, {
  name: 'Role',
  description: "user's role",
});

@Entity()
@ObjectType()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  updatedAt: string;

  @Column({ nullable: true })
  @Field(() => Role, { defaultValue: Role.User, nullable: true })
  roles: Role;

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  @OneToMany(() => Comments, (commnets) => commnets.user)
  comments: Comments[];
}
