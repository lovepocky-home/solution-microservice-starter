import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './business/books/books.module';
import { CommentModule } from './business/comment/comment.module';
import { CoreModule } from './core/core.module';
import { AuthnMiddleware } from './middlewares/authn.middleware';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    CoreModule,
    BooksModule,
    CommentModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
