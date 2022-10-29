import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './business/books/books.module';
import { Book } from './business/books/entities/book.entity';
import { CommentModule } from './business/comment/comment.module';
import { Comment } from './business/comment/entities/comment.entity';
import { ValidationPipe } from './common/validation.pipe';
import { AuthnMiddleware } from './middlewares/authn.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (c: ConfigService) => {
        const url = c.get('database.postgresql.url')
        Logger.log('database.postgresql.url: ' + url, TypeOrmModule.name)
        return {
          type: 'postgres',
          url,
          entities: [Book, Comment],
          synchronize: true,
          logging: ['schema'],
          logger: 'advanced-console',
        }
      }
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      debug: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      useGlobalPrefix: true,
    }),
    BooksModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // NOTE: move authn to api-gateway
    consumer.apply(AuthnMiddleware)
      .forRoutes(
        'graphql',
        'v1',
      )
  }
}
