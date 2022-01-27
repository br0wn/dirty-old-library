import { Image, Link, Location } from './meta.data';
import { Genre, Style } from './taxonomy';

export enum ArtistType {
	ARTIST = 'artist'
}

export interface Artist {
	id?: string;
	name: string;
	type: ArtistType;
	description?: string;
	linkList?: Link[];
	profilePicture?: Image;
	pictureList?: Image[];
	location?: Location;
	genreList?: Genre[];
	styleList?: Style[];
}
