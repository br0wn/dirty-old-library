import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';

@Module({
	imports: [
		CoreModule,
	],
	providers: [],
})
export class CliModule {
}
