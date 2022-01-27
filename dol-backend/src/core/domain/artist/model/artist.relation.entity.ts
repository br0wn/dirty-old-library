import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Artist } from './artist.entity';

export enum RelationType {
	MEMBER_OF = 'member_of'
}

@Entity()
export class ArtistRelation {

	@PrimaryColumn()
	relationType: RelationType;

	@ManyToOne(() => Artist)
	artist: Artist;
	@PrimaryColumn()
	artistId: string;

	@ManyToOne(() => Artist)
	relatedTo: Artist;
	@PrimaryColumn()
	relatedToId: string;

	/*
	 * Date time when the relation of two artists started
	 */
	@Column({
		type: 'timestamp',
		nullable: true,
	})
	startAt?: Date;

	/*
	 * Date time when the relation of two artists ended
	 */
	@Column({
		type: 'timestamp',
		nullable: true,
	})
	endAt?: Date;

}
