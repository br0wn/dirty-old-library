/**
 * Returns uri including first slash and without last slash
 *    /foo/bar/baz
 *
 * @param uri
 */
export function normalizeUri(uri: string) {
	if (uri[0] !== '/') {
		uri = '/' + uri;
	}

	if (uri[uri.length - 1] === '/') {
		uri = uri.substr(0, uri.length - 1);
	}

	return uri;
}

export function normalizeBaseUrl(baseUrl: string) {
	if (baseUrl[baseUrl.length - 1] === '/') {
		baseUrl = baseUrl.substr(0, baseUrl.length - 1);
	}

	return baseUrl;
}
