import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { CurrentUser } from 'src/users/customDecorators/currentUser.decorator';
import { Users } from 'src/users/entities/users.entity';
import { Role } from 'src/users/enums/role.enum';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';
import { RoleGuard } from 'src/users/guards/role.guard';
import { CreatePostDto, UpdatePostDto } from '../dtos/createPost.dto';
import { PostPayload } from '../dtos/post.payload';
import { Posts } from '../enitities/post.entity';
import { CommentService } from '../services/comments.service';
import { PostsService } from '../services/posts.service';

@Resolver(() => Posts)
export class PostsResolver {
  constructor(private readonly postsService: PostsService, private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => PostPayload)
  async createPosts(@Args('createPostDto') createPostDto: CreatePostDto, @CurrentUser() user: Users): Promise<PostPayload> {
    const post = await this.postsService.createPost(createPostDto, user);
    return {
      post,
      response: { message: 'Post  created successfully', status: 201 },
    };
  }

  @Mutation(() => PostPayload)
  async updatePost(@Args('id') id: number, @Args('updatePostDto') updatePostDto: UpdatePostDto): Promise<PostPayload> {
    const post = await this.postsService.updatePost(id, updatePostDto);
    return {
      post,
      response: {
        message: 'Post updated successfully',
        status: 201,
      },
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard(Role.Admin))
  @Mutation(() => PostPayload)
  async deletePost(@Args('id') id: number): Promise<PostPayload> {
    const post = await this.postsService.deletePost(id);
    return {
      post,
      response: {
        status: 200,
        message: `Post deleted successfully`,
      },
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard(Role.User))
  @Query(() => [Posts])
  async findAllPosts(): Promise<Posts[]> {
    const posts = await this.postsService.findAllPosts();
    return posts;
  }

  @Query(() => [Posts])
  async getPosts(@Args('search') search: string) {
    if (search) {
      // return this.postsService.searchForPosts(search);
    }
    return this.postsService.findAllPosts();
  }

  @ResolveField(() => [Comment])
  async comments(@Parent() post: Posts) {
    if (post?.id) {
      return await this.commentService.findByPostId(post?.id);
    }
  }
}
