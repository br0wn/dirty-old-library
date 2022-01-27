import { ClassSerializerInterceptor, Module, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE, Reflector } from '@nestjs/core';
import { ValidationResult } from '../../lib/validator/model/validation.result';
import { ArtistModule } from './artist/artist.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { LabelModule } from './label/label.module';
import { ReleaseModule } from './release/release.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { VenueModule } from './venue/venue.module';

@Module({
	imports: [
		AuthModule,
		UserModule,
		ArtistModule,
		LabelModule,
		ReleaseModule,
		TrackModule,
		VenueModule,
		EventModule,
	],
	providers: [
		{
			provide: APP_PIPE,
			useFactory: () => {
				return new ValidationPipe({
					transform: true,
					whitelist: true,
					validationError: {
						target: false,
						value: false,
					},
					exceptionFactory: errorList => new UnprocessableEntityException(
						ValidationResult.createFromErrorList(errorList),
					),
				});
			},
		},
		{
			provide: APP_INTERCEPTOR,
			inject: [Reflector],
			useFactory: (reflector: Reflector) => {
				return new ClassSerializerInterceptor(reflector);
			},
		},
	],
})
export class WwwModule {
}
