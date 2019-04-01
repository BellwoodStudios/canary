/** Common DTOs */
import { IsNumberString } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class FindOneDto {

	@IsNumberString()
	id:number;

}

@ArgsType()
export class PaginationDto {

	@Field(type => Int)
	skip:number = 0;

	@Field(type => Int)
	take:number = 25;

}
