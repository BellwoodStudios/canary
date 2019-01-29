import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';

@Module({})
export class DatabaseModule {

	static async forRoot ():Promise<DynamicModule> {
		return TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService:ConfigService) => configService.config.get('database'),
			inject: [ConfigService],
		});
	}

}
