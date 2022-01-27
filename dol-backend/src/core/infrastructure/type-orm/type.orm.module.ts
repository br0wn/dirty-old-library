import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

const modules = [
	NestTypeOrmModule.forRootAsync({
		useFactory: async () => {
			const connectionOptions = await getConnectionOptions();

			return {
				...connectionOptions,
				entities: [],
				migrations: [], // disable migrations when running the NestJs app
				autoLoadEntities: true,
			};
		},
	}),
];

@Module({
	imports: modules,
	exports: modules,
})
export class TypeOrmModule {
}
