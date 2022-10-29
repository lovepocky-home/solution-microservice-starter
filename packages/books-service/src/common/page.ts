import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

// generic of swagger model
// https://github.com/nestjs/swagger/issues/86#issuecomment-510927068
// https://github.com/MichalLytek/type-graphql/issues/670#issuecomment-658176834

export type ClassType<T = any> = new (...args: any[]) => T;

class PageInfo {

  @ApiProperty()
  total: number

}

export function Paginated<T extends ClassType>(dataT: T) {

  class P {
    @ApiProperty({ type: () => dataT, isArray: true })
    data: T[]

    @ApiProperty()
    pageInfo: PageInfo
  }
  return P
}

// ---

export abstract class PageQuery {

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  keyword?: string

  @IsInt()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ nullable: true, default: 1, required: false })
  page?: number = 1 // default

  @IsInt()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ nullable: true, required: false, default: 10, description: "page size" })
  size?: number = 10 // default

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ nullable: true, required: false, description: "parse by new Date()" })
  start?: Date

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ nullable: true, required: false, description: "parse by new Date()" })
  end?: Date

  getSkip() {
    return (this.page - 1) * this.size
  }
}
