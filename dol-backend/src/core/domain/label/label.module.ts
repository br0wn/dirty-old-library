import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaDataModule } from '../meta-data/meta.data.module';
import { LabelService } from './service/label.service';
import { Label } from './model/label.entity';

const imports = [
	TypeOrmModule.forFeature([Label]),
	MetaDataModule,
];

const providers: Provider[] = [
	LabelService,
];

@Module({
	imports,
	providers,
	exports: providers,
})
export class LabelModule {
}
