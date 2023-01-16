import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
// import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SearchModule } from './search/search.module';
import { ChatModule } from './chat/chat.module';
import { DatabaseConfig } from './database.config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      driver: ApolloDriver,
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
    PostsModule,
    UsersModule,
    SearchModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
