import { Module, Global, DynamicModule } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({})
export class ConfigModule {

    static forRoot (paths:Array<string>):DynamicModule {
        let config = new ConfigService(paths);
        config.load();
        return {
            module:ConfigModule,
            providers: [{
                provide: ConfigService,
                useValue: config,
            }],
            exports: [ConfigService]
        };
    }

}