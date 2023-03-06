import { Field, ObjectType } from '@nestjs/graphql';
import { Users } from 'src/users/entities/users.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Posts } from './post.entity';
// import { Replies } from './replies.entity';

@Entity()
@ObjectType()
export class Comments {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  text: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  postsId: number;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  updatedAt: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  parentId: number;

  @ManyToOne(() => Users, (user) => user.comments)
  user: Users;

  @ManyToOne(() => Posts, (posts) => posts.comments)
  posts: Posts;

  @ManyToOne(() => Comments)
  parent: Comments;

  // @Field(() => Comments, { nullable: true })
  // reply: Comments;

  @Field(() => Number, { nullable: true })
  replyCount: number;
}
