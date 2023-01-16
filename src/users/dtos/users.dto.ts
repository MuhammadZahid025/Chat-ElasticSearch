import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { Role } from '../enums/role.enum';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Role, { nullable: true, defaultValue: Role.User })
  role?: Role;
}

@InputType()
export class UpdateUserInput {
  name: string;
  email: string;
  password: string;
}

@ObjectType()
export class userDto {
  status: number;
  message: string;
}
@InputType()
export class SignInUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
@ObjectType()
export class signInResponsePayload {
  @Field()
  status: number;

  @Field()
  message: string;
}

@ObjectType()
export class UserPayload {
  @Field()
  accesstoken: string;
  @Field()
  response?: signInResponsePayload;
}
