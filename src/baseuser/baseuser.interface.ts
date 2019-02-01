import { BaseUser } from './baseuser.entity';

export interface BaseUserService<T extends BaseUser> {
	getUserByIdentifier (identifier:string):Promise<T>;
}
