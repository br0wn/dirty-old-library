import { Global, Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Validator } from './validator/validator';

const providers: Provider[] = [
	Validator,
];

@Global()
@Module({
	imports: [ConfigModule],
	providers,
	exports: providers,
})
export class ValidationModule {
}
