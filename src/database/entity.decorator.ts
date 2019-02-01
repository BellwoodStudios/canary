import { createParamDecorator, NotFoundException, PipeTransform } from '@nestjs/common';

// TODO this is not working -- find a solution
export const FetchEntity = createParamDecorator(async (data, req):Promise<Array<PipeTransform<any>>> => {
	if (!Array.isArray(data)) {
		data = [data, Object.keys(req.params)[0]];
	}

	const [type, param] = data;
	const value = req.params[param];
	const query = {};

	query[param] = value;
	// const entity = await type.findOne(query);
	const entity = null;

	if (!entity) {
		// throw new NotFoundException('Entity not found.');
	}
	return entity;
});
