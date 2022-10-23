import { ApiProperty } from "@nestjs/swagger"

export class CreateCommentDto {

  @ApiProperty()
  bookId: string

  @ApiProperty()
  content: string

  @ApiProperty()
  byUserId: string
}
