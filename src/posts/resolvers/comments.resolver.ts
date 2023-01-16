import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/users/customDecorators/currentUser.decorator';
import { Users } from 'src/users/entities/users.entity';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';
import { CreateCommentDto } from '../dtos/createCommentDto';
import { Comments } from '../enitities/comments.entity';
import { CommentService } from '../services/comments.service';

@Resolver(() => Comments)
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Comments)
  async createComment(@Args('createCommentDto') createCommentDto: CreateCommentDto, @CurrentUser() user: Users) {
    return this.commentService.createComment(createCommentDto, user);
  }
}
