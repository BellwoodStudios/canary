import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEntity } from './role.interface';
import { ConfigService } from '../config';

@Injectable()
export class RoleGuard implements CanActivate {

	constructor (
		private readonly reflector:Reflector,
		private readonly configService:ConfigService,
	) {}

	canActivate (context:ExecutionContext):boolean {
		if (this.configService.config.get('role').strategy === 'allowAll') {
			return true;
		}

		const role = this.reflector.get<string>('role', context.getHandler());
		const alwaysAllow = this.reflector.get<boolean[]>('alwaysAllow', context.getHandler());
		const allowIfLoggedIn = this.reflector.get<boolean[]>('allowIfLoggedIn', context.getHandler());
		const allowIfLoggedOut = this.reflector.get<boolean[]>('allowIfLoggedOut', context.getHandler());

		// Always allow takes precendence
		if (alwaysAllow) {
			return true;
		}

		// Next see if we are logged in or not
		const request = context.switchToHttp().getRequest();
		const user:RoleEntity = request.user;
		if (user != null) {
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
