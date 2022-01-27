import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Artist } from '../../artist/model/artist.entity';
import { Track } from './track.entity';

export enum CreditType {
	COMPOSED_BY = 'composed_by',
}

@Entity()
export class TrackCredit {

	@ManyToOne(() => Track)
	track: Track;

	@IsNotEmpty()
	@IsString()
	@PrimaryColumn()
	trackId: string;

	@ManyToOne(() => Artist)
	artist: Artist;

	@IsNotEmpty()
	@IsString()
	@PrimaryColumn()
	artistId: string;

	@IsNotEmpty()
	@IsEnum(CreditType)
	@Column()
	creditType: CreditType;
}
