import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export abstract class Model {

	@PrimaryGeneratedColumn()
	@Field(type => Int)
	id:number;

	@CreateDateColumn()
	@Field()
	created:Date;

	@UpdateDateColumn()
	@Field()
	updated:Date;
	
}
