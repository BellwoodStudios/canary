import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { BaseUserService } from '../baseuser/baseuser.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { BaseUser } from 'src/baseuser/baseuser.entity';

@Injectable()
export class AuthService {

	constructor (
		private readonly userService:BaseUserService<BaseUser>,
		private readonly jwtService:JwtService,
	) {}

	/**
	 * Log the current user in. This should only be called after authentication logic has completed successfully.
	 * @param token The token to track the user.
	 */
	async signIn (token:string):Promise<string> {
		const payload:JwtPayload = { token };
		return this.jwtService.sign(payload);
	}

	async validateUser (payload:JwtPayload):Promise<BaseUser> {
		return await this.userService.getUserByToken(payload.token);
	}

}
