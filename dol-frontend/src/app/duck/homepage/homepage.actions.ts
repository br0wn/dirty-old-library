import {IArtist, IEvent, IHomePageData, ILabel, IRelease, IVenue} from '../../model/model.homepagetypes';

export const FETCH_HOMEPAGE_DATA = 'FETCH_HOMEPAGE_DATA';
export const UPDATE_HOMEPAGE_DATA = 'UPDATE_HOMEPAGE_DATA';
export const UPDATE_DETAILS = 'UPDATE_DETAILS';
export const UPDATE_RELEASE = 'UPDATE_RELEASE';
export const UPDATE_LABEL = 'UPDATE_LABEL';
export const UPDATE_ARTIST = 'UPDATE_ARTIST';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const UPDATE_VENUE = 'UPDATE_VENUE';
export const FETCH_RELEASE = 'FETCH_RELEASE';
export const FETCH_LABEL = 'FETCH_LABEL';
export const FETCH_VENUE = 'FETCH_VENUE';
export const FETCH_EVENT = 'FETCH_EVENT';
export const FETCH_ARTIST = 'FETCH_ARTIST';
export const GET_DETAILS = 'GET_DETAILS';

export interface IFetchHomePageDataAction {
    type: typeof FETCH_HOMEPAGE_DATA
    payload: string
}

interface IUpdateHomePageDataAction {
    type: typeof UPDATE_HOMEPAGE_DATA
    payload: Partial<IHomePageData>
}

export interface IUpdateDetailsAction {
    type: typeof UPDATE_DETAILS
    payload: IEvent | IArtist | IVenue
}

export interface IUpdateReleaseAction {
    type: typeof UPDATE_RELEASE
    payload: IRelease
}

export interface IUpdateLabelAction {
    type: typeof UPDATE_LABEL,
    payload: ILabel
}

export interface IUpdateArtistAction {
    type: typeof UPDATE_ARTIST,
    payload: IArtist
}

export interface IUpdateEventAction {
    type: typeof UPDATE_EVENT,
    payload: IEvent
}

export interface IUpdateVenueAction {
    type: typeof UPDATE_VENUE,
    payload: IVenue
}

export interface IFetchReleaseAction {
    type: typeof FETCH_RELEASE,
    payload: string
}

export interface IFetchLabelAction {
    type: typeof FETCH_LABEL,
    payload: string
}

export interface IFetchVenueAction {
    type: typeof FETCH_VENUE,
    payload: string
}

export interface IFetchEventAction {
    type: typeof FETCH_EVENT,
    payload: string
}

export interface IFetchArtistAction {
    type: typeof FETCH_ARTIST,
    payload: string
}

export interface IGetDetailsAction {
    type: typeof GET_DETAILS
    payload: IEvent | IArtist | IVenue
}

export function updateReleaseAction(release: IRelease): IUpdateReleaseAction {
    return {
        type: UPDATE_RELEASE,
        payload: release
    }
}

export function fetchReleaseAction(id: string): IFetchReleaseAction {
    return {
        type: FETCH_RELEASE,
        payload: id
    }
}

export function fetchLabelAction(id: string): IFetchLabelAction {
    return {
        type: FETCH_LABEL,
        payload: id
    }
}

export function fetchVenueAction(id: string): IFetchVenueAction {
    return {
        type: FETCH_VENUE,
        payload: id
    }
}

export function fetchEventAction(id: string): IFetchEventAction {
    return {
        type: FETCH_EVENT,
        payload: id
    }
}

export function fetchArtistAction(id: string): IFetchArtistAction {
    return {
        type: FETCH_ARTIST,
        payload: id
    }
}

export function updateLabelAction(label: ILabel): IUpdateLabelAction {
    return {
        type: UPDATE_LABEL,
        payload: label
    }
}

export function updateArtistAction(artist: IArtist): IUpdateArtistAction {
    return {
        type: UPDATE_ARTIST,
        payload: artist
    }
}

export function updateEventAction(event: IEvent): IUpdateEventAction {
    return {
        type: UPDATE_EVENT,
        payload: event
    }
}

export function updateVenueAction(venue: IVenue): IUpdateVenueAction {
    return {
        type: UPDATE_VENUE,
        payload: venue
    }
}

export type HomePageActionTypes =
    IFetchHomePageDataAction
    | IUpdateHomePageDataAction
    | IUpdateDetailsAction
    | IGetDetailsAction
    | IUpdateReleaseAction
    | IUpdateLabelAction
    | IUpdateArtistAction
    | IUpdateVenueAction
    | IUpdateEventAction
    | IFetchReleaseAction
    | IFetchLabelAction
    | IFetchArtistAction
    | IFetchEventAction
    | IFetchVenueAction

export function fetchHomePageDataAction(searchInput: string): IFetchHomePageDataAction {
    return {
        type: FETCH_HOMEPAGE_DATA,
        payload: searchInput
    }
}

export function updateHomePageDataAction(homePageData: Partial<IHomePageData>): IUpdateHomePageDataAction {
    return {
        type: UPDATE_HOMEPAGE_DATA,
        payload: homePageData
    }
}
