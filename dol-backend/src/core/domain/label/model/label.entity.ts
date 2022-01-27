import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Image, Link, Location } from '../../meta-data/model/meta.data.model';

@Entity()
export class Label {

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

	@IsOptional()
	@IsString()
	@Column({ nullable: true })
	contactInfo?: string;

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Link)
	@Column({
		type: 'jsonb',
		nullable: true,
	})
	linkList?: Link[];

	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => Image)
	@Column({
		type: 'jsonb',
		nullable: true,
	})
	profilePicture?: Image;

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Image)
	@Column({
		type: 'jsonb',
		nullable: true,
	})
	pictureList?: Image[];

	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => Location)
	@Column({
		type: 'jsonb',
		nullable: true,
	})
	location?: Location;

}
