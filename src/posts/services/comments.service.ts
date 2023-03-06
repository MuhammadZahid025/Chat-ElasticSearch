import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Equal, IsNull, Repository } from 'typeorm';
import { CreateCommentDto } from '../dtos/createCommentDto';
import { Comments } from '../enitities/comments.entity';
import { PostsService } from './posts.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comments)
    private commentRepository: Repository<Comments>,
    private readonly postService: PostsService,
  ) {}

  /**
   * Creates comment
   * @param createCommentDto
   * @param user
   * @returns comment
   */

  async createComment(createCommentDto: CreateCommentDto, user: Users): Promise<Comments> {
    try {
      const { text, postId, parentId } = createCommentDto;
      const newComment = this.commentRepository.create({
        text,
      });
      if (parentId) {
        const comment = await this.findOne(parentId);
        newComment.parent = comment;
        newComment.parentId = comment?.id;
      }
      if (postId) {
        const post = await this.postService.findPostById(postId);
        newComment.postsId = post?.id;
        newComment.posts = post;
      }
      if (user) {
        newComment.user = user;
        newComment.userId = user?.id;
      }
      return await this.commentRepository.save(newComment);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds one
   * @param id
   * @returns one
   */

  async findOne(id: number): Promise<Comments> {
    return await this.commentRepository.findOne({ where: { id } });
  }

  /**
   * Finds by post id
   * @param postsId
   * @returns by post id
   */

  async findByPostId(postsId: number): Promise<Comments[]> {
    const result = await this.commentRepository.find({
      where: { postsId, parentId: IsNull() },
      order: {
        createdAt: 'DESC',
      },
    });
    return result;
  }

  async replyCount(id: number): Promise<number> {
    const count = await this.commentRepository.count({ where: { parentId: Equal(id) } });
    console.log(count);
    return count;
  }

  async getReplies(id: number): Promise<Comments[]> {
    const replies = this.commentRepository.find({
      where: {
        parentId: Equal(id),
      },
    });
    return replies;
  }
}
