/** Common DTOs */
import { IsNumberString, IsInt } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class IdLookup {

	@IsNumberString()
	@IsInt()
	@Field(type => Int)
	id:number;

}

@ArgsType()
export class Pagination {

	@Field(type => Int)
	@IsInt()
	skip:number = 0;

	@Field(type => Int)
	@IsInt()
	take:number = 25;

}
