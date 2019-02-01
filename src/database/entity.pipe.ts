import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus, BadRequestException } from '@nestjs/common';

// TODO this is not working -- find a solution
@Injectable()
export class EntityPipe implements PipeTransform<string, number> {

	transform (value:string, metadata:ArgumentMetadata):number {
		const val = parseInt(value, 10);
		if (isNaN(val)) {
			throw new BadRequestException('Validation failed');
		}
		return val;
	}

}
