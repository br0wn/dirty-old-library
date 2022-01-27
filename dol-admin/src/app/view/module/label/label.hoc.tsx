import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from '../../../../api/model/label';
import { RootState } from '../../../redux/module/_root';
import { loadLabel, selectById } from '../../../redux/module/label';

export interface LabelProviderProps {
	id?: string;
	children?: (label?: Label) => JSX.Element;
	render?: (label?: Label) => JSX.Element;
}

export const LabelProvider: FunctionComponent<LabelProviderProps> = (props) => {
	const label = useSelector((state: RootState) => selectById(state, props.id || ''));
	const dispatch = useDispatch();

	useEffect(() => {
		if (!!props.id && !label) {
			dispatch(loadLabel(props.id));
		}
	}, [props.id, dispatch, label]);

	return props.render?.(label) || props.children?.(label) || null;
};
