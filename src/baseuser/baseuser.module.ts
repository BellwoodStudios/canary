import { Module } from '@nestjs/common';
import { BaseUserService } from './baseuser.service';

@Module({
	imports: [],
	providers: [{
		provide: BaseUserService,
		useValue: null,
	}],
	exports: [BaseUserService],
})
export class BaseUserModule {}
