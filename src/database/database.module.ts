import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';

@Module({})
export class DatabaseModule {

	static async forRootAsync () {
		return TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService:ConfigService) => configService.config.get('database'),
			inject: [ConfigService],
		});
	}

}