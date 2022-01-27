import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Artist } from '../../../../api/model/artist';
import { RootState } from '../../../redux/module/_root';
import { loadArtist, selectById } from '../../../redux/module/artist';

export interface ArtistProviderProps {
	id?: string;
	children?: (artist?: Artist) => JSX.Element;
	render?: (artist?: Artist) => JSX.Element;
}

export const ArtistProvider: FunctionComponent<ArtistProviderProps> = (props) => {
	const artist = useSelector((state: RootState) => selectById(state, props.id || ''));
	const dispatch = useDispatch();

	useEffect(() => {
		if (!!props.id && !artist) {
			dispatch(loadArtist(props.id));
		}
	}, [props.id, dispatch, artist]);

	return props.render?.(artist) || props.children?.(artist) || null;
};
