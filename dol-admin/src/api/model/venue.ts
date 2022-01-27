import { Image, Link, Location } from './meta.data';

export interface Venue {
	id?: string;
	name: string;
	description?: string;
	contactInfo?: string;
	linkList?: Link[];
	profilePicture?: Image;
	pictureList?: Image[];
	location?: Location;
}
