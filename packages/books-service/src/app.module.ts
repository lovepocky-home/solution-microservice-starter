import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './business/books/books.module';
import { Book } from './business/books/entities/book.entity';
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
          database: 'books',
          entities: [Book],
          synchronize: true,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // NOTE: move authn to api-gateway
    consumer.apply(AuthnMiddleware)
      .forRoutes(
        'graphql',
      )
  }
}
