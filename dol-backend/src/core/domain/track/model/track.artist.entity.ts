import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Artist } from '../../artist/model/artist.entity';
import { Track } from './track.entity';

export enum TrackArtistType {
	MAIN = 'main',
	FEATURED = 'featured'
}

@Entity()
export class TrackArtist {

	@ManyToOne(() => Artist)
	artist: Artist;

	@IsNotEmpty()
	@IsString()
	@PrimaryColumn()
	artistId: string;

	@ManyToOne(() => Track)
	track: Track;

	@IsNotEmpty()
	@IsString()
	@PrimaryColumn()
	trackId: string;

	@IsNotEmpty()
	@IsEnum(TrackArtistType)
	@Column()
	artistType: TrackArtistType;

	@IsOptional()
	@IsNumber()
	@Min(0)
	order?: number;

}
