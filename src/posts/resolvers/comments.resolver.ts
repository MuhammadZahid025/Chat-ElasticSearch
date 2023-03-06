import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/users/customDecorators/currentUser.decorator';
import { Users } from 'src/users/entities/users.entity';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';
import { UsersService } from 'src/users/users.service';
import { CreateCommentDto } from '../dtos/createCommentDto';
import { Comments } from '../enitities/comments.entity';
import { CommentService } from '../services/comments.service';

@Resolver(() => Comments)
@UseGuards(JwtAuthGuard)
export class CommentResolver {
  constructor(private commentService: CommentService, private readonly userService: UsersService) {}

  @Query(() => [Comments])
  async replies(@Args('commentId') commentId: number): Promise<Comments[]> {
    return await this.commentService.getReplies(commentId);
  }

  @Mutation(() => Comments)
  async createComment(@Args('createCommentDto') createCommentDto: CreateCommentDto, @CurrentUser() user: Users) {
    return this.commentService.createComment(createCommentDto, user);
  }

  @ResolveField(() => Users)
  async user(@Parent() post: Comments) {
    const user = this.userService.findUserById(post.userId);
    return user;
  }

  @ResolveField(() => Number)
  async replyCount(@Parent() comment: Comments): Promise<number> {
    return this.commentService.replyCount(comment.id);
  }
}
