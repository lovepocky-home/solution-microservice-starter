import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  create(createBookInput: CreateBookInput) {
    return 'This action adds a new book';
  }

  findAll(): Book[] {
    return [
      {
        name: "活着",
        ISBN: "9787506365437"
      }
    ]
  }

  findOne(id: number) {
    return null
    // return `This action returns a #${id} book`;
  }

  update(id: number, updateBookInput: UpdateBookInput) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
