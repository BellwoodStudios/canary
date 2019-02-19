import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEntity } from './role.interface';
import { ConfigService } from '../config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RoleGuard extends AuthGuard('jwt') {

	constructor (
		private readonly reflector:Reflector,
		private readonly configService:ConfigService,
	) {
		super();
	}

	async canActivate (context:ExecutionContext):Promise<boolean> {
		if (this.configService.config.get('role').strategy === 'allowAll') {
			return true;
		}

		const roles = this.reflector.get<string[]>('role', context.getHandler());
		const role = roles != null ? roles[0] : null;
		const alwaysAllow = this.reflector.get<boolean[]>('alwaysAllow', context.getHandler());
		const allowIfLoggedIn = this.reflector.get<boolean[]>('allowIfLoggedIn', context.getHandler());
		const allowIfLoggedOut = this.reflector.get<boolean[]>('allowIfLoggedOut', context.getHandler());
		let isLoggedIn = false;
		try {
			isLoggedIn = (await super.canActivate(context)).valueOf() as boolean;
		} catch (err) {
			isLoggedIn = false;
		}

		// Always allow takes precendence
		if (alwaysAllow) {
			return true;
		}

		// Next see if we are logged in or not
		const request = context.switchToHttp().getRequest();
		if (isLoggedIn) {
			const user:RoleEntity = request.user;
			if (allowIfLoggedIn) {
				return true;
			} else if (role != null) {
				// Finally check the role
				return user.hasRole(role);
			} else {
				return false;
			}
		} else {
			return !!allowIfLoggedOut;
		}
	}
	
}
