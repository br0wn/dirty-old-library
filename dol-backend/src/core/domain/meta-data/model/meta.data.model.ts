/*
 * Link
 */
import { IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum LinkType {
	YOUTUBE = 'youtube'
}

export class Link {
	@IsNotEmpty()
	@IsString()
	url: string;

	@IsNotEmpty()
	@IsString()
	title: string;

	@IsOptional()
	@IsEnum(LinkType)
	type?: LinkType;
}

/*
 * Image
 */
export class Image {
	@IsNotEmpty()
	@IsString()
	url: string;

	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	description?: string;
}

/*
 * Location
 */
export class Location {
	@IsOptional()
	@IsString()
	address?: string;

	@IsOptional()
	@IsString()
	city?: string;

	@IsOptional()
	@IsString()
	zipCode?: string;
	@IsOptional()
	@IsString()

	@IsOptional()
	@IsString()
	country?: string;

	@IsOptional()
	@IsLatitude()
	latitude?: number;

	@IsOptional()
	@IsLongitude()
	longitude?: number;
}
