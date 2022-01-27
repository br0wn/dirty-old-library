import { Expose, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Image, Link, Location } from '../../meta-data/model/meta.data.model';
import { Genre } from '../../taxonomy/model/genre.entity';
import { Style } from '../../taxonomy/model/style.entity';

enum ArtistType {
	// @TODO: to be discussed

	ARTIST = 'artist' // default and only for now
}


@Entity()
export class Artist {

	@Expose()
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@IsNotEmpty()
	@IsString()
	@Column()
	name: string;

	@IsEnum(ArtistType)
	@Column()
	type: ArtistType;

	@IsOptional()
	@IsString()
	@Column({ nullable: true })
	description?: string;

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

	@ManyToMany(() => Genre, {
		nullable: true,
	})
	genreList?: Genre[];

	@ManyToMany(() => Style, {
		nullable: true,
	})
	styleList?: Style[];

}
