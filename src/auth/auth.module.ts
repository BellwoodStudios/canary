import { Module, DynamicModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { BaseUserModule } from '../baseuser/baseuser.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '../config/config.service';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			useFactory: (configService:ConfigService) => {
				const cfg = configService.config.get('auth');
				return {
					secretOrPrivateKey: cfg.secretKey,
					signOptions: {
						expiresIn: cfg.timeout,
					},
				};
			},
			inject: [ConfigService],
		}),
		BaseUserModule,
	],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
