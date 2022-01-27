import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReleaseMaster {

	@Expose()
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@IsNotEmpty()
	@IsString()
	@Column()
	name: string;

	@IsOptional()
	@IsString()
	@Column({ nullable: true })
	description?: string;

}
