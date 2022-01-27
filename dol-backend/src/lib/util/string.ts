export const trimAndNullEmptyString = (value: any): any => {
	if (typeof value !== 'string') {
		return value;
	}

	value = value.trim();

	return value.length <= 0 ? null : value;
};
