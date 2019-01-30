import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class Model {

	@PrimaryGeneratedColumn()
	id:number;

	@CreateDateColumn()
	created:Date;

	@UpdateDateColumn()
	updated:Date;
	
}
