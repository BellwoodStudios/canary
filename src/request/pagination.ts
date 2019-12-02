/** Common DTOs */
import { IsNumberString, IsInt, IsOptional, Min, Max } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';
import { Type } from 'class-transformer';

@ArgsType()
export class Pagination {

	@Field(type => Int, { nullable:true, defaultValue:0 })
	@Type(() => Number)
	@IsOptional()
	@IsInt()
	@Min(0)
	skip?:number;

	@Field(type => Int, { nullable:true, defaultValue:25 })
	@Type(() => Number)
	@IsOptional()
	@IsInt()
	@Min(0)
	@Max(100)
	take?:number;

}
