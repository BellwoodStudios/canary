import { Module, Global, DynamicModule } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({})
export class ConfigModule {

	static async forRoot (paths:string[]):Promise<DynamicModule> {
		const config = new ConfigService();
		await config.addConfigs(__dirname + '/../**/*.configdefs.js');
		for (const p of paths) {
			await config.addConfigs(p);
		}
		config.load();
		return {
			module:ConfigModule,
			providers: [{
				provide: ConfigService,
				useValue: config,
			}],
			exports: [ConfigService],
		};
	}

}
