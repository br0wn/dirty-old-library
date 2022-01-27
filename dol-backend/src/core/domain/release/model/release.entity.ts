import { Expose, Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Image, Link, Location } from '../../meta-data/model/meta.data.model';
import { Format } from '../../taxonomy/model/format.entity';
import { Genre } from '../../taxonomy/model/genre.entity';
import { Style } from '../../taxonomy/model/style.entity';
import { ReleaseArtist } from './release.artist.entity';
import { ReleaseLabel } from './release.label.entity';
import { ReleaseMaster } from './release.master.entity';

@Entity()
export class Release {

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

	@ManyToOne(() => ReleaseMaster, {
		nullable: true,
	})
	releaseMaster?: string;

	@IsOptional()
	@IsString()
	@Column({ nullable: true })
	releaseMasterId?: string;

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ReleaseArtist)
	@OneToMany(() => ReleaseArtist, (object) => object.release, {
		cascade: true,
		orphanedRowAction: 'delete',
	})
	@JoinTable()
	artistList: ReleaseArtist[];

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ReleaseLabel)
	@OneToMany(() => ReleaseLabel, (object) => object.release, {
		cascade: true,
		orphanedRowAction: 'delete',
	})
	@JoinTable()
	labelList: ReleaseLabel[];

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	@Column({
		type: 'timestamp',
		nullable: true,
	})
	publishedAt?: Date;

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

	@ManyToMany(() => Format, {
		nullable: true,
	})
	formatList?: Format[];
}
