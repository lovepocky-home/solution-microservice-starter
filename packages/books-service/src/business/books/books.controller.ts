import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

@ApiTags('book')
@Controller('v1/book')
export class BooksController {

  constructor(private svc: BooksService) { }

  @Get(':id')
  @ApiResponse({ type: Book })
  async get(@Param('id') id: string) {
    return this.svc.findOne(id)
  }

  @Get('/')
  @ApiResponse({ type: Book, isArray: true })
  async getList() {
    return this.svc.findPage()
  }
}
