import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {

  private logger = new Logger(BooksService.name)

  constructor(@InjectRepository(Book) private bookRepo: Repository<Book>,) {

  }

  create(createBookInput: CreateBookInput) {
    return 'This action adds a new book';
  }

  findAll() {
    return this.bookRepo.find()
  }

  async findPage() {
    return {
      data: await this.bookRepo.find(),
      pageInfo: {
        total: await this.bookRepo.count()
      }
    }
  }

  findOne(id: string) {
    this.logger.debug(`find book by id ${id}`)
    return this.bookRepo.findOne({ where: { id } })
  }

  update(id: number, updateBookInput: UpdateBookInput) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
