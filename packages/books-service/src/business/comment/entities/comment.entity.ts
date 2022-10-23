import { Field, GraphQLISODateTime } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Comment {

  // db
  @PrimaryColumn({ default: () => 'gen_random_uuid()' })
  // openapi
  @ApiProperty()
  id: string

  @Column()
  @ApiProperty()
  bookId: string

  @Column()
  @ApiProperty()
  content: string

  @Column()
  @ApiProperty()
  byUserId: string

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  @ApiProperty()
  updatedAt: Date;
}
