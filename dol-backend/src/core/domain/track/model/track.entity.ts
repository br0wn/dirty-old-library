import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Release } from '../../release/model/release.entity';
import { TrackArtist } from './track.artist.entity';
import { TrackCredit } from './track.credit.entity';

@Entity()
export class Track {

	@Expose()
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@IsNotEmpty()
	@IsString()
	@Column()
	name: string;

	@ManyToOne(() => Release)
	release: Release;

	@IsNotEmpty()
	@IsString()
	@Column()
	releaseId: string;

	@OneToMany(() => TrackArtist, (object) => object.track, {
		cascade: true,
		orphanedRowAction: 'delete',
	})
	@JoinTable()
	artistList: TrackArtist[];

	@OneToMany(() => TrackCredit, (object) => object.track, {
		cascade: true,
		orphanedRowAction: 'delete',
	})
	@JoinTable()
	creditList: TrackCredit[];

	@IsOptional()
	@IsString()
	@Column({ nullable: true })
	description?: string;

	@IsOptional()
	@IsString()
	@Column({ nullable: true })
	duration?: string;

	@IsOptional()
	@IsString()
	@Column({ nullable: true })
	position?: string;
}
