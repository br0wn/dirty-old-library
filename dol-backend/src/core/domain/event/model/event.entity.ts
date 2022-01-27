import { Expose, Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Image, Link, Location } from '../../meta-data/model/meta.data.model';
import { Venue } from '../../venue/model/venue.entity';

@Entity()
export class Event {

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
	@IsDate()
	@Type(() => Date)
	@Column({
		type: 'timestamp',
		nullable: true,
	})
	startAt?: Date;

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	@Column({
		type: 'timestamp',
		nullable: true,
	})
	endAt?: Date;

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

	@ManyToOne(() => Venue, {
		nullable: true,
	})
	venue?: Venue;

	@IsOptional()
	@IsString()
	@Column({ nullable: true })
	venueId?: string;


}
