import { Request } from 'express';

export function getIpAddress(req: Request) {
	let ip = req.ip;

	// fix for if you have both ipv4 and ipv6
	if (ip.substr(0, 7) === '::ffff:') {
		ip = ip.substr(7);
	}

	return ip;
}

export function getHostname(req: Request) {
	if (!!req.headers.host) {
		return req.headers.host;
	}

	const localPort = req.connection.localPort;
	let hostname = req.hostname;

	if (localPort !== 80 && localPort !== 443) {
		hostname += ':' + localPort;
	}

	return hostname;
}

export function getFullBaseUrl(req: Request) {
	const protocol = req.protocol;
	const hostname = getHostname(req);
	const baseUrl = req.baseUrl;

	return protocol + '://' + hostname + baseUrl;
}
