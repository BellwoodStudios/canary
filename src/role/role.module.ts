import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from '.';

@Module({
	providers: [
		{
			provide: APP_GUARD,
			useClass: RoleGuard,
		},
	],
})
export class RoleModule {}
