import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Artist } from '../../artist/model/artist.entity';
import { Release } from './release.entity';

export enum ReleaseArtistType {
	MAIN = 'main',
	FEATURED = 'featured'
}

@Entity()
export class ReleaseArtist {

	@ManyToOne(() => Artist)
	artist: Artist;

	@IsNotEmpty()
	@IsString()
	@PrimaryColumn()
	artistId: string;

	@Exclude()
	@ManyToOne(() => Release)
	release: Release;

	@Exclude()
	@PrimaryColumn()
	releaseId: string;

	@Column()
	artistType: ReleaseArtistType;

	@Column({ nullable: true })
	order?: number;

}
