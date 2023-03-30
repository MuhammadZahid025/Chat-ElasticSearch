import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CurrentUser } from './customDecorators/currentUser.decorator';
import { CreateUserInput, SignInUserInput, UpdateUser, UserPayload } from './dtos/users.dto';
import { Users } from './entities/users.entity';
import { JwtAuthGuard } from './guards/jwt.guard';
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

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Users)
  async updateUser(@Args('updateUser') updateUser: UpdateUser, @CurrentUser() user: Users): Promise<Users> {
    const { affected } = await this.usersService.updateUser(updateUser, user);
    if (affected) {
      const updatedUser = await this.usersService.findUserById(user.id);
      return updatedUser;
    }
  }
}
