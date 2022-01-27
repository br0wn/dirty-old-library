import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from './model/venue.entity';
import { VenueService } from './service/venue.service';

const imports = [
	TypeOrmModule.forFeature([Venue]),
];

const providers: Provider[] = [
	VenueService,
];

@Module({
	imports,
	providers,
	exports: providers,
})
export class VenueModule {
}
