import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Book {

  @Field(() => String, { description: 'book name' })
  name: string;

  @Field(() => String, {
    nullable: true
  })
  ISBN?: string;
}
