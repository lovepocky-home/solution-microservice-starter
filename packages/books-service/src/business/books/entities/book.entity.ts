import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class Book {

  @PrimaryColumn({ default: () => 'gen_random_uuid()' })
  @Field(() => String, { description: 'record id' })
  id: string

  @Column()
  @Field(() => String, { description: 'book name' })
  name: string;

  @Column()
  @Field(() => String, { nullable: true })
  ISBN?: string;

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

}
