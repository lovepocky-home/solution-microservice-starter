export * from './books.service';
import { BooksService } from './books.service';
export * from './comment.service';
import { CommentService } from './comment.service';
export * from './default.service';
import { DefaultService } from './default.service';
export const APIS = [BooksService, CommentService, DefaultService];
