import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from "typeorm";
import { BaseEntity } from '../../../common/base.entity';

@Entity()
@ObjectType()
export class Book extends BaseEntity {

  @Column()
  @Field(() => String, { description: 'book name' })
  @ApiProperty()
  name: string;

  @Column()
  @Field(() => String, { nullable: true })
  @ApiProperty()
  ISBN?: string;

}
