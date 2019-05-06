export default {
	debug: {
		doc: 'Turn on debugging.',
		format: Boolean,
		default: true,
	},
	playground: {
		doc: 'Turn on the Apollo playground.',
		format: Boolean,
		default: true,
	},
	autoSchemaFile: {
		doc: 'Auto generate the GraphQL definitions to this file.',
		format: String,
		default: 'src/schema.gql',
	},
	installSubscriptionHandlers: {
		doc: 'Enable subscriptions.',
		format: Boolean,
		default: true,
	},
};
