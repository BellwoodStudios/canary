export default {
	type: {
		doc: 'Database type.',
		format: ['mysql', 'postgres', 'mariadb', 'sqlite', 'cordova', 'nativescript', 'oracle', 'mssql', 'mongodb', 'sqljs', 'react-native'],
		default: 'mysql',
	},
	name: {
		doc: 'The name for this database connection.',
		format: String,
		default: 'Database',
	},
	host: {
		doc: 'Database host name/IP.',
		format: String,
		default: '127.0.0.1',
	},
	port: {
		doc: 'Database port.',
		format: 'port',
		default: '3306',
	},
	username: {
		doc: 'User to log in as.',
		format: String,
		default: 'root',
	},
	password: {
		doc: 'Password to log in.',
		format: String,
		default: 'root',
		sensitive: true,
	},
	database: {
		doc: 'The database to connect to.',
		format: String,
		default: 'db',
	},
	entities: {
		// tslint:disable-next-line:max-line-length
		doc: 'Entities to be loaded and used for this connection. Accepts both entity classes and directories paths to load from. Directories support glob patterns.',
		format: Array,
		default: [],
	},
	synchronize: {
		// tslint:disable-next-line:max-line-length
		doc: 'Indicates if database schema should be auto created on every application launch. Be careful with this option and don\'t use this in production - otherwise you can lose production data. This option is useful during debug and development. As an alternative to it, you can use CLI and run schema:sync command. Note that for MongoDB database it does not create schema, because MongoDB is schemaless. Instead, it syncs just by creating indices..',
		format: Boolean,
		default: false,
	},
};
