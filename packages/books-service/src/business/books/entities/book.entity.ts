import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class Book {

  // db
  @PrimaryColumn({ default: () => 'gen_random_uuid()' })
  // graphql
  @Field(() => String, { description: 'record id' })
  // openapi
  @ApiProperty()
  id: string

  @Column()
  @Field(() => String, { description: 'book name' })
  @ApiProperty()
  name: string;

  @Column()
  @Field(() => String, { nullable: true })
  @ApiProperty()
  ISBN?: string;

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  @ApiProperty()
  updatedAt: Date;

}
