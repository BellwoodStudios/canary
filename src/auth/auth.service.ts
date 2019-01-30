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
	 * Generate a JWT from the provided token.
	 * 
	 * @param token The token to track the user.
	 */
	async generateJwt (token:string):Promise<string> {
		const payload:JwtPayload = { token };
		return this.jwtService.sign(payload);
	}

	async validateUser (payload:JwtPayload):Promise<BaseUser> {
		return await this.userService.getUserByToken(payload.token);
	}

}
