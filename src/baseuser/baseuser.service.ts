import { Injectable } from '@nestjs/common';
import { BaseUser } from './baseuser.entity';

@Injectable()
export abstract class BaseUserService<T extends BaseUser> {

	abstract getUserByToken (token:string):Promise<T>;

}
