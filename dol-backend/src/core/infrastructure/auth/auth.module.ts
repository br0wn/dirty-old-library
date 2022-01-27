import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { CONFIG_TOKEN } from '../../../config/security';
import { ConfigModule } from '../config/config.module';
import { UserModule } from '../../domain/user/user.module';
import { REQUEST_AUTH_PROPERTY } from './auth.constant';
import { AuthService } from './auth.service';
import { JwtStrategy, JwtStrategyOptions } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';

const providers: Provider[] = [
	AuthService,
	{
		provide: JwtStrategyOptions,
		inject: [ConfigService],
		useFactory: (config: ConfigService) => {
			const jwtSecret = config.get(CONFIG_TOKEN).jwt.secret;
			return plainToClass(JwtStrategyOptions, { jwtSecret });
		},
	},
	JwtStrategy,
	LocalStrategy,
];

@Module({
	imports: [
		PassportModule.register({
			defaultStrategy: 'jwt',
			property: REQUEST_AUTH_PROPERTY,
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => {
				return {
					secret: config.get(CONFIG_TOKEN).jwt.secret,
					signOptions: { expiresIn: '10m' },
				};
			},
		}),
		ConfigModule,
		UserModule,
	],
	providers,
	exports: [...providers, PassportModule],
})
export class AuthModule {

}
