import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEntity } from './role.interface';
import { ConfigService } from '../config';
import { AuthGuard } from '@nestjs/passport';
import { Ctx } from 'type-graphql';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RoleGuard extends AuthGuard('jwt') {

	constructor (
		private readonly reflector:Reflector,
		private readonly configService:ConfigService,
	) {
		super();
	}

	getRequest (context:ExecutionContext) {
		if (context.getArgs().length === 4) {
			const ctx = GqlExecutionContext.create(context);
			return ctx.getContext().req;
		} else {
			return context.switchToHttp().getRequest();
		}
	}

	async canActivate (context:ExecutionContext):Promise<boolean> {
		if (this.configService.config.get('role').strategy === 'allowAll') {
			return true;
		}

		const handler = context.getHandler();
		const request = this.getRequest(context);

		const roles = this.reflector.get<string[]>('role', handler);
		const role = roles != null ? roles[0] : null;
		const alwaysAllow = this.reflector.get<boolean[]>('alwaysAllow', handler);
		const allowIfLoggedIn = this.reflector.get<boolean[]>('allowIfLoggedIn', handler);
		const allowIfLoggedOut = this.reflector.get<boolean[]>('allowIfLoggedOut', handler);
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
