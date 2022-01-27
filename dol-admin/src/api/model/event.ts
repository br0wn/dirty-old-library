import { Image, Link, Location } from './meta.data';

export interface Event {
	id?: string;
	name: string;
	description?: string;
	startAt?: string;
	endAt?: string;
	linkList?: Link[];
	profilePicture?: Image;
	pictureList?: Image[];
	location?: Location;
	venueId?: string;
}
