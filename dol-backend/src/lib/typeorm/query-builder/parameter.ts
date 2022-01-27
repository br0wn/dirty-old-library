export function normalizeWhereInValue<T>(value: T | T[]): T | T[] {
	if (!Array.isArray(value)) {
		return value;
	}

	/*
	 * hack for correct handling of empty array as value
	 * https://github.com/typeorm/typeorm/issues/2195
	 */
	return value.concat([null]);
}

