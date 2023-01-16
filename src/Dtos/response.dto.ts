import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
class ResponseObject {
  @Field({ nullable: true })
  message: string;

  @Field({ nullable: true })
  error?: string;

  @Field(() => Int, { nullable: true })
  status: number;
}
@ObjectType()
export class ResponsePaylaod {
  @Field(() => ResponseObject, { nullable: true })
  response?: ResponseObject;
}
