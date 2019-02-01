import { JwtService } from '@nestjs/jwt';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AuthJwtPayload } from './jwt';
import { BaseUserService, BaseUser, APP_USER_SERVICE } from '../baseuser';

@Injectable()
export class AuthService {

	constructor (
		@Inject(forwardRef(() => APP_USER_SERVICE)) private readonly userService:BaseUserService<BaseUser>,
		private readonly jwtService:JwtService,
	) {}

	/**
	 * Generate a JWT from the provided identifier.
	 * 
	 * @param identifier The identifier to track the user.
	 */
	async generateToken (identifier:string):Promise<string> {
		const payload:AuthJwtPayload = { identifier };
		return this.jwtService.sign(payload);
	}

	async validateUser (payload:AuthJwtPayload):Promise<BaseUser> {
		return await this.userService.getUserByIdentifier(payload.identifier);
	}

}
