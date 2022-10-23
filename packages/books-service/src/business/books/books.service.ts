import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {

  constructor(@InjectRepository(Book) private bookRepo: Repository<Book>,) {

  }

  create(createBookInput: CreateBookInput) {
    return 'This action adds a new book';
  }

  findAll() {
    return this.bookRepo.find()
  }

  findOne(id: string) {
    return this.bookRepo.findOne({ where: { id } })
    // return `This action returns a #${id} book`;
  }

  update(id: number, updateBookInput: UpdateBookInput) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
