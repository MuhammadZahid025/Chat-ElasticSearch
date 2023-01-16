import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput, SignInUserInput, UserPayload } from './dtos/users.dto';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';

@Resolver()
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => String)
  async hello() {
    return 'Hello, World';
  }

  @Mutation(() => Users)
  async signUp(@Args('createUserInput') createUserInput: CreateUserInput): Promise<Users> {
    return await this.usersService.signUp(createUserInput);
  }

  @Mutation(() => UserPayload)
  async signIn(@Args('user') signInUserInput: SignInUserInput): Promise<UserPayload> {
    return await this.usersService.signIn(signInUserInput);
  }
}
