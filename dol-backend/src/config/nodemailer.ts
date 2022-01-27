import { registerAs } from '@nestjs/config';
import { parseBoolean } from '../lib/config/parse.env';

export const CONFIG_TOKEN = 'nodemailer';

export default registerAs(CONFIG_TOKEN, () => {
	let auth;

	if (!!process.env.SMTP_USER) {
		auth = {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		};
	}

	return {
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: parseBoolean(process.env.SMTP_SECURE),
		auth,
	};
});
