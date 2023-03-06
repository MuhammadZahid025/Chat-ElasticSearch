import { Client } from '@elastic/elasticsearch';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Posts } from 'src/posts/enitities/post.entity';
import { PostSearchBody } from './dtos/search.input';
import { PostSearchResult } from './dtos/searchResult.payload';

@Injectable()
export class SearchService {
  index = 'posts';
  constructor(@Inject('ELASTICSEARCH_CLIENT') private readonly client: Client) {}

  /**
   * Indexs post
   * @param post
   * @returns
   */

  async indexPost(post: Posts) {
    try {
      return await this.client.index<PostSearchBody>({
        index: this.index,
        body: {
          id: post.id,
          title: post.title,
          text: post.text,
          userId: post.userId,
          createdAt: post.createdAt,
          userName: post.user.name,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Searchs search service
   * @param text
   * @returns
   */

  async search(text: string) {
    try {
      const result: any = await this.client.search<PostSearchResult>({
        index: this.index,
        body: {
          query: {
            multi_match: {
              query: text,
              fields: ['text', 'title'],
            },
          },
        },
      });
      const hits = result.hits.hits;
      return hits.map((item) => item._source);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates in es
   * @param post
   * @returns
   */

  async updateInES(post: Posts) {
    const newBody = {
      id: post.id,
      text: post.text,
      userId: post.userId,
    };
    const script = Object.entries(newBody).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');
    // console.log('--------->>', script);
    return this.client.updateByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: post.id,
          },
        },
        script: script,
      },
    });
  }
}
