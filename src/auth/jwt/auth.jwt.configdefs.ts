export default {
	secretKey: {
		doc: 'A randomly generated secret key to use with JWT signing/validation.',
		format: String,
		default: 'secretkey123',
		sensitive: true,
	},
	timeout: {
		doc: 'The duration for which a JWT is valid.',
		format: 'int',
		default: 3600,
	},
};
