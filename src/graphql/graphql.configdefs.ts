export default {
	typePaths: {
		doc: 'A list of paths that contain the GraphQL definitions.',
		format: Array,
		default: './**/*.graphql',
	},
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
	definitions: {
		path: {
			doc: 'Auto generate the GraphQL definitions to this file.',
			format: String,
			default: 'src/graphql.schema.ts',
		},
		outputAs: {
			doc: 'Auto generated file output type.',
			format: ['class', 'interface'],
			default: 'class',
		},
	},
};
