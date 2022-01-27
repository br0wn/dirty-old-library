import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Style {
	@Expose()
	@PrimaryGeneratedColumn()
	id?: number;

	@IsNotEmpty()
	@IsString()
	@Column()
	name: string;
}
