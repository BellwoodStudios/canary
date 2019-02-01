export default {
	strategy: {
		doc: 'The authorization strategy. Allow access to everything or opt-in whitelisting.',
		format: ['whitelist', 'allowAll'],
		default: 'allowAll',
	},
};
