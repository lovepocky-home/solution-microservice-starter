import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { PageQuery, PaginatedSchema } from '../../common/page';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

class BookListPageQuery extends PageQuery {

  @ApiProperty({ nullable: true, required: false })
  ISBN?: string
}

@ApiTags('book')
@Controller('v1/book')
export class BooksController {

  private logger = new Logger(BooksController.name)

  constructor(private svc: BooksService) { }

  @Get(':id')
  @ApiOkResponse({ type: Book })
  async get(@Param('id') id: string) {
    return this.svc.findOne(id)
  }

  @Get('/')
  // @ApiOkResponse({ type: Paginated(Book) })
  @ApiOkResponse({ schema: PaginatedSchema(Book) })
  async getList(@Query() q: BookListPageQuery) {
    this.logger.debug(`q ${JSON.stringify(q)}`)
    return this.svc.findPage()
  }
}
