/** Common DTOs */
import { IsNumberString } from 'class-validator';

export class FindOneDto {
	@IsNumberString()
	id:number;
}
