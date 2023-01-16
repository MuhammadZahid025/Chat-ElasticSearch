import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchService } from 'src/search/search.service';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from '../dtos/createPost.dto';
import { Posts } from '../enitities/post.entity';
// import { PostProvider } from '../../search/client';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
    private readonly userService: UsersService,
    private readonly searchService: SearchService, // private readonly postProvider: PostProvider,
  ) {}

  /**
   * Creates post
   * @param createPostDto
   * @param userId
   * @returns post
   */

  async createPost(createPostDto: CreatePostDto, user: Users): Promise<Posts> {
    try {
      const { text } = createPostDto;
      const newPost = this.postRepository.create({
        text,
        userId: user?.id,
      });
      newPost.user = user;
      await this.postRepository.save(newPost);
      // await this.searchService.indexPost(newPost);
      return newPost;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Deletes post
   * @param id
   * @returns post
   */

  async deletePost(id: number): Promise<Posts> {
    try {
      const post = await this.findPostById(id);
      if (!post) {
        throw new Error('Post not found');
      }
      await this.postRepository.delete({ id });
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates post
   * @param id
   * @param updatePostDto
   * @returns post
   */

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Posts> {
    try {
      const { text } = updatePostDto;
      const post = await this.findPostById(id);
      if (!post) {
        throw new Error('Post not found');
      }
      const updatedPost: Posts = await this.postRepository.save({ id, text, userId: post?.userId });
      if (updatedPost) {
        // await this.searchService.updateInES(updatedPost);
      }
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all posts
   * @returns all posts
   */

  async findAllPosts(): Promise<Posts[]> {
    try {
      console.log('-------->Test');
      const allPosts = this.postRepository.find();
      return allPosts;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds post by id
   * @param postId
   * @returns post by id
   */

  async findPostById(postId: number): Promise<Posts> {
    return this.postRepository.findOne({ where: { id: postId } });
  }

  /**
   * Searchs for posts
   * @param text
   * @returns for posts
   */

  // async searchForPosts(text: string): Promise<Posts[]> {
  //   try {
  //     const results = await this.searchService.search(text);
  //     const ids = results.map((result) => result.id);
  //     if (!ids.length) {
  //       return [];
  //     }
  //     return this.postRepository.find({ where: { id: In(ids) } });
  //   } catch (error) {}
  // }
}
