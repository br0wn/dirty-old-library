import { registerAs } from '@nestjs/config';
import { parseBoolean } from '../lib/config/parse.env';

export const CONFIG_TOKEN = 'minio';

export default registerAs(CONFIG_TOKEN, () => {
	return {
		endPoint: process.env.MINIO_ENDPOINT,
		port: parseInt(process.env.MINIO_PORT),
		useSSL: parseBoolean(process.env.MINIO_USE_SSL),
		accessKey: process.env.MINIO_ACCESS_KEY,
		secretKey: process.env.MINIO_SECRET_KEY,
	};
});
