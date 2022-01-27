import { Module } from '@nestjs/common';
import { ArtistModule } from './domain/artist/artist.module';
import { EventModule } from './domain/event/event.module';
import { LabelModule } from './domain/label/label.module';
import { MetaDataModule } from './domain/meta-data/meta.data.module';
import { ReleaseModule } from './domain/release/release.module';
import { TaxonomyModule } from './domain/taxonomy/taxonomy.module';
import { TrackModule } from './domain/track/track.module';
import { UserModule } from './domain/user/user.module';
import { VenueModule } from './domain/venue/venue.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { ConfigModule } from './infrastructure/config/config.module';
import { DebugModule } from './infrastructure/debug/debug.module';
import { MinioModule } from './infrastructure/minio/minio.module';
import { NodemailerModule } from './infrastructure/nodemailer/nodemailer.module';
import { RoutingModule } from './infrastructure/routing/routing.module';
import { TemplateModule } from './infrastructure/template/template.module';
import { TypeOrmModule } from './infrastructure/type-orm/type.orm.module';
import { ValidationModule } from './infrastructure/validation/validation.module';

const modules = [
	/*
	 * Infrastructure
	 */
	ConfigModule,
	TypeOrmModule,
	DebugModule,
	NodemailerModule,
	TemplateModule,
	RoutingModule,
	MinioModule,
	ValidationModule,
	AuthModule,
	/*
	 * Domain
	 */
	UserModule,
	MetaDataModule,
	TaxonomyModule,
	ArtistModule,
	LabelModule,
	ReleaseModule,
	TrackModule,
	VenueModule,
	EventModule,
];

@Module({
	imports: modules,
	exports: modules,
})
export class CoreModule {
}
