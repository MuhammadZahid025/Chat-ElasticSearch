import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentDto {
  @Field()
  text: string;

  @Field()
  postId: number;

  @Field({ nullable: true })
  parentId?: number;
}
