import { registerAs } from '@nestjs/config';
import { parseBoolean } from '../lib/config/parse.env';

export const CONFIG_TOKEN = 'http';

export default registerAs(CONFIG_TOKEN, () => {
	return {
		cors: {
			origin: true,
			methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE'],
			allowedHeaders: ['Content-Type', 'Authorization'],
			exposedHeaders: ['Link'],
			credentials: true,
		},
		server: {
			port: process.env.PORT || 8000,
			trustProxy: parseBoolean(process.env.TRUST_PROXY),
		},
		routing: {
			baseUrl: process.env.ROUTER_BASE_URL,
		},
		cache: {
			ttl: process.env.HTTP_CACHE_TTL || 300,
		}
	};
});
