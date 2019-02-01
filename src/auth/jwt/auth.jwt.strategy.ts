import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import { AuthJwtPayload } from '.';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
	constructor (
		private readonly configService:ConfigService,
		private readonly authService:AuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.config.get('auth.jwt').secretKey,
		});
	}

	async validate (payload:AuthJwtPayload) {
		const user = await this.authService.validateUser(payload);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
