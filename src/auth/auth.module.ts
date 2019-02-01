import { Module, DynamicModule, Type, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthJwtStrategy } from './jwt';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config';

@Module({})
export class AuthModule {

	static withUserModule (UserModule:Type<any>):DynamicModule {
		return {
			module: AuthModule,
			imports: [
				PassportModule.register({ defaultStrategy: 'jwt' }),
				JwtModule.registerAsync({
					useFactory: (configService:ConfigService) => {
						const cfg = configService.config.get('auth.jwt');
						return {
							secretOrPrivateKey: cfg.secretKey,
							signOptions: {
								expiresIn: cfg.timeout,
							},
						};
					},
					inject: [ConfigService],
				}),
				forwardRef(() => UserModule),
				JwtModule,
			],
			providers: [
				AuthJwtStrategy,
				AuthService,
			],
			exports: [AuthService],
		};
	}

}
