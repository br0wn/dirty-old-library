import {IHomePageData} from '../../model/model.homepagetypes';
import {
    HomePageActionTypes,
    UPDATE_ARTIST,
    UPDATE_DETAILS,
    UPDATE_EVENT,
    UPDATE_HOMEPAGE_DATA,
    UPDATE_LABEL,
    UPDATE_RELEASE,
    UPDATE_VENUE
} from './homepage.actions';

export const initialState: IHomePageData = {
    events: [],
    venues: [],
    artists: [],
    detailItem: {
        name: "",
        type: ""
    },
    release: {
        releaseTitle: "",
        name: "",
        type: "release"
    },
    label: {
        name: ""
    },
    artist: {
        name: ""
    },
    event: {
        name: ""
    },
    venue: {
        name: ""
    }
};

export function homepageReducer(state = initialState, action: HomePageActionTypes): IHomePageData {
    switch (action.type) {
        case UPDATE_HOMEPAGE_DATA:
            return {...state, ...action.payload};
        case UPDATE_DETAILS:
            return {...state, detailItem: action.payload};
        case UPDATE_RELEASE:
            return {...state, release: action.payload};
        case UPDATE_LABEL:
            return {...state, label: action.payload};
        case UPDATE_ARTIST:
            return {...state, artist: action.payload};
        case UPDATE_VENUE:
            return {...state, venue: action.payload};
        case UPDATE_EVENT:
            return {...state, event: action.payload};
        default:
            return state
    }
}
