import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export abstract class Model {

	@PrimaryGeneratedColumn()
	@Field(type => ID)
	id:number;

	@CreateDateColumn()
	@Field()
	created:Date;

	@UpdateDateColumn()
	@Field()
	updated:Date;
	
}
