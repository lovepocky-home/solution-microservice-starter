export * from './book.service';
import { BookService } from './book.service';
export * from './comment.service';
import { CommentService } from './comment.service';
export * from './default.service';
import { DefaultService } from './default.service';
export const APIS = [BookService, CommentService, DefaultService];
