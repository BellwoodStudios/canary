import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: (configService:ConfigService) => configService.config.get('database'),
			inject: [ConfigService],
		}),
	],
	exports: [
		TypeOrmModule,
	],
})
export class DatabaseModule {}
