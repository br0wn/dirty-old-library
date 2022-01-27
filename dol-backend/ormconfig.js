const path = require('path');

// noinspection JSConstantReassignment
module.exports = {
	/*
	 * Configurable
	 */
	'host': process.env.TYPEORM_HOST || 'localhost',
	'port': process.env.TYPEORM_PORT || 5432,
	'username': process.env.TYPEORM_USERNAME || 'project',
	'password': process.env.TYPEORM_PASSWORD || 'password',
	'database': process.env.TYPEORM_DATABASE || 'project',
	'synchronize': (process.env.TYPEORM_SYNCHRONIZE === 'true') || false,
	'logging': (process.env.TYPEORM_LOGGING === 'true') || false,
	'keepConnectionAlive': true,
	'ssl': process.env.TYPEORM_SSL === 'true' || false,
	'extra': {
		'ssl': process.env.TYPEORM_SSL === 'true' ? {
			'rejectUnauthorized': process.env.TYPEORM_EXTRA_SSL,
		} : undefined,
	},

	/*
	 * Fixed
	 */
	'name': 'default',
	'type': 'postgres',
	'entities': [
		path.join(__dirname, 'src', '**', '*.entity.ts'),
	],
	'migrations': [
		path.join(__dirname, 'src', 'core', 'type-orm', 'migration', '*.ts'),
	],
	'cli': {
		'migrationsDir': path.join('src', 'core', 'type-orm', 'migration'),
	},
};
