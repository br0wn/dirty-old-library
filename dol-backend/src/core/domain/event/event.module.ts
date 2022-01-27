import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueModule } from '../venue/venue.module';
import { EventService } from './service/event.service';
import { Event } from './model/event.entity';

const imports = [
	TypeOrmModule.forFeature([Event]),
	VenueModule,
];

const providers: Provider[] = [
	EventService,
];

@Module({
	imports,
	providers,
	exports: providers,
})
export class EventModule {
}
