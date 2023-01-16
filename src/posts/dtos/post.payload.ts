import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePaylaod } from 'src/Dtos/response.dto';
import { Posts } from '../enitities/post.entity';

@ObjectType()
export class PostPayload extends ResponsePaylaod {
  @Field(() => Posts, { nullable: true })
  post?: Posts;
}
