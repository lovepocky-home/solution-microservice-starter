import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {

  constructor(@InjectRepository(Comment) private bookRepo: Repository<Comment>) { }

  create(createCommentDto: CreateCommentDto) {
    return this.bookRepo.save(createCommentDto)
  }

  async findPage(bookId: string) {
    const [data, total] = await this.bookRepo.findAndCount({ where: { bookId } })
    return { data, pageInfo: { total } }
  }

  findAllByBook(bookId: string) {
    return this.bookRepo.find({ where: { bookId } })
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
