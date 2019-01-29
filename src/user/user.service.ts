import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

	findOneByEmail (email:string) {
		return { email };
	}

}
