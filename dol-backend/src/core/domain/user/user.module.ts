import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CONFIG_TOKEN } from '../../../config/security';
import { BCryptPasswordEncoder } from '../../../lib/security/encoder/bcrypt.password.encoder';
import { ConfigModule } from '../../infrastructure/config/config.module';
import { DebugModule } from '../../infrastructure/debug/debug.module';
import { NodemailerModule } from '../../infrastructure/nodemailer/nodemailer.module';
import { CreateUserCommand } from './command/create.user.command';
import { ResetPasswordCommand, ResetPasswordCommandConfig } from './command/reset.password.command';
import { UpdatePasswordCommand } from './command/update.password.command';
import { UpdateUserCommand } from './command/update.user.command';
import { User } from './model/user.entity';
import { GetUserListQuery } from './query/get.user.list.query';
import { GetUserQuery } from './query/get.user.query';
import { UserEntityRepository } from './repository/user.entity.repository';

const providers: Provider[] = [
	BCryptPasswordEncoder,
	UserEntityRepository,
	GetUserQuery,
	GetUserListQuery,
	CreateUserCommand,
	UpdateUserCommand,
	{
		provide: ResetPasswordCommandConfig,
		inject: [ConfigService],
		useFactory: (configService: ConfigService) => {
			const config = configService.get(CONFIG_TOKEN);
			return plainToClass(ResetPasswordCommandConfig, {
				updatePasswordUrl: config.auth.updatePasswordUrl,
				resetPasswordEmailFrom: config.auth.resetPasswordEmailFrom,
				resetPasswordEmailSubject: config.auth.resetPasswordEmailSubject,
			});
		},
	},
	ResetPasswordCommand,
	UpdatePasswordCommand,
];

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		DebugModule,
		NodemailerModule,
		ConfigModule,
	],
	providers,
	exports: providers,
})
export class UserModule {
}
