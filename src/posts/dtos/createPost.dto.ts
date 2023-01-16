import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { Posts } from '../enitities/post.entity';

@InputType()
export class CreatePostDto {
  @Field()
  text: string;
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
