import { Field, GraphQLISODateTime } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity as B, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity extends B {

  @PrimaryColumn({ default: () => 'gen_random_uuid()', comment: "uuid v4" })
  @Field()
  @ApiProperty()
  id: string

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  @ApiProperty()
  updatedAt: Date;
}