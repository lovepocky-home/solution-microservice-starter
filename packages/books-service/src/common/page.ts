import { ApiProperty } from "@nestjs/swagger";

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
