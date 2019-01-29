import { Module, DynamicModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
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
		UserModule,
	],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
