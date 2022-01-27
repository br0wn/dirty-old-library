import {IDataItem} from './IDataItem';
import L, {IconOptions} from 'leaflet';

export const VENUES = "venues";
export const ARTISTS = "artists";
export const EVENTS = "events";

const iconDefaultOptions: IconOptions = {
    iconUrl: "",
    iconRetinaUrl: "",
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
    shadowSize: [68, 95],
    shadowAnchor: [20, 92]
};

export const POINTERS = {
    "logo": L.icon({
        ...iconDefaultOptions,
        iconUrl: require('../assets/vectors/logo.svg'),
        iconRetinaUrl: require('../assets/vectors/logo.svg')
    }),
    "venues": L.icon({
        ...iconDefaultOptions,
        iconUrl: require('../assets/vectors/markers/venue.svg'),
        iconRetinaUrl: require('../assets/vectors/markers/venue.svg')
    }),
    "events": L.icon({
        ...iconDefaultOptions,
        iconUrl: require('../assets/vectors/markers/event.svg'),
        iconRetinaUrl: require('../assets/vectors/markers/event.svg')
    }),
    "artists": L.icon({
        ...iconDefaultOptions,
        iconUrl: require('../assets/vectors/markers/artist.svg'),
        iconRetinaUrl: require('../assets/vectors/markers/artist.svg')
    })
};


export interface IArtistImage {
    image: string;
}
export interface ILabelImage {
    image: string;
}

export interface IVenueImage {
    image: string;
}
export interface IEventImage {
    image: string;
}

export interface IEvent extends IDataItem {
    name: string;
    price?: string;
    location?: string;
    about?: string;
    performers?: string;
    infoAboutTickets?: string;
    freeText?: string;
    publishedAt?: string;
    profilePicture?: IEventImage[];
    startAt?: string;
    endAt?: string;
    shortDescription?: string;
}

export interface IArtist extends IDataItem {
    about: string;
    info: string;
    summary: string;
    place?: string;
    startYear?: string;
    genre?: string;
    style?: string;
    link?: string;
    members?: IArtist[];
    group?: IArtist;
    releases?: IRelease[];
    artistImages?: IArtistImage[];
}

export interface IRelease extends IDataItem {
    releaseTitle: string;
    profilePicture?: string;
    year?: string;
    label?: ILabel;
    country?: string;
    genre?: string;
    style?: string;
    description?: string;
    publishedAt?: string;
}

export interface IVenue extends IDataItem {
    profilePicture: string;
    location: string;
    shortDescription?: string;
    publishedAt?: string;
    about: string;
}

export interface IHomePageItems {
    events: IEvent[];
    artists: IArtist[];
    venues: IVenue[];
}

export interface IHomePageData extends IHomePageItems {
    [x: string]: any;
    events: IEvent[];
    artists: IArtist[];
    venues: IVenue[];
    detailItem: IEvent | IVenue | IArtist;
    release: IRelease;
}
export interface ILabel extends IDataItem {
    id?: string;
    name: string;
    origin: string;
    shortDescription?: string;
    link: string;
    contact: string;
    releases: IRelease[];
    labelImages: ILabelImage[];
}
