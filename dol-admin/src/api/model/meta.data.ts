/*
 * Link
 */
export enum LinkType {
	YOUTUBE = 'youtube'
}

export interface Link {
	url: string;
	title?: string;
	type?: LinkType;
}

/*
 * Image
 */
export interface Image {
	url: string;
	title?: string;
	description?: string;
}

/*
 * Location
 */
export interface Location {
	address?: string;
	city?: string;
	zipCode?: string;
	country?: string;
	longitude?: number;
	latitude?: number;
}

