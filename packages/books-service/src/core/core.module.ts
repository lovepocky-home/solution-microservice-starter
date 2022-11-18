import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Book } from '../business/books/entities/book.entity';
import { Comment } from '../business/comment/entities/comment.entity';
import { ValidationPipe } from '../common/validation.pipe';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env.local',
        '.env',
      ],
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
  ],
  exports: [ConfigModule],
  providers: [
    { provide: APP_PIPE, useClass: ValidationPipe },
  ]
})
export class CoreModule { }
