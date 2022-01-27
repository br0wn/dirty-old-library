export function parseBoolean(value: any, defaultValue?: boolean): boolean | any {
	if (value === 'true') {
		return true;
	}
	if (value === 'false') {
		return false;
	}

	return !!defaultValue || !!value || false;
}

export function parseNumber(value: any, defaultValue?: number): number | any {
	if (value === undefined || value === null) {
		return defaultValue || value;
	}

	value = parseFloat(value);

	if (isNaN(value)) {
		return defaultValue || undefined;
	}

	return value;
}
