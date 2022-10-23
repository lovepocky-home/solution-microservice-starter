import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from "typeorm";
import { BaseEntity } from '../../../common/base.entity';

@Entity()
export class Comment extends BaseEntity {

  @Column()
  @ApiProperty()
  bookId: string

  @Column()
  @ApiProperty()
  content: string

  @Column()
  @ApiProperty()
  byUserId: string

}
