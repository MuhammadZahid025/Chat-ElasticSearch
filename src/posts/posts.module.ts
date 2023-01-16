import { Module } from '@nestjs/common';
import { Posts } from './enitities/post.entity';
import { PostsService } from './services/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsResolver } from './resolvers/posts.resolver';
import { UsersModule } from 'src/users/users.module';
import { CommentResolver } from './resolvers/comments.resolver';
import { CommentService } from './services/comments.service';
import { Comments } from './enitities/comments.entity';
import { SearchModule } from 'src/search/search.module';
import { PostsSubscriber } from './subscribers/posts.subscriber';
import { ClientProvider } from 'src/search/clientProvider';
// import { PostProvider } from '../search/client';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Comments]), UsersModule, SearchModule],
  controllers: [],
  providers: [PostsService, PostsResolver, CommentResolver, CommentService, PostsSubscriber, ClientProvider],
})
export class PostsModule {}
