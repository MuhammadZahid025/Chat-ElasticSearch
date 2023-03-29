import { InputType, Field, ObjectType, Int } from '@nestjs/graphql';
import { Posts } from '../enitities/post.entity';

@InputType()
export class CreatePostDto {
  @Field()
  title: string;

  @Field()
  text: string;

  @Field()
  image?: string;
}

@InputType()
export class UpdatePostDto {
  @Field()
  text: string;
}

@ObjectType()
export class CreatePostsResponsePayload {
  @Field()
  status: number;

  @Field()
  message: string;
}

@ObjectType()
export class CreatePostsPayload {
  @Field()
  posts: Posts;

  @Field()
  response?: CreatePostsResponsePayload;
}

@InputType()
export class PaginateInput {
  @Field(() => Int)
  skip?: number;

  @Field(() => Int)
  take?: number;
}

@ObjectType()
export class AllPostsType {
  @Field(() => [Posts])
  items: Posts[];
  @Field()
  total: number;
}
