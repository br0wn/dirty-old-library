import { Image, Link, Location } from './meta.data';
import { Format, Genre, Style } from './taxonomy';


export interface Release {
	id?: string;
	name: string;
	description?: string;
	releaseMasterId?: string;
	publishedAt?: string;
	linkList?: Link[];
	profilePicture?: Image;
	pictureList?: Image[];
	location?: Location;
	genreList?: Genre[];
	styleList?: Style[];
	formatList?: Format[];
}

export interface ReleaseMaster {
	id?: string;
	name: string;
	description?: string;
}

export enum ReleaseArtistType {
	MAIN = 'main',
	FEATURED = 'featured'
}

export interface ReleaseArtist {
	releaseId: string;
	artistId: string;
	artistType: ReleaseArtistType;
	order?: number;
}

export interface ReleaseLabel {
	releaseId: string;
	labelId: string;
	releaseNumber?: string
}
