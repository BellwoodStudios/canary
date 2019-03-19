export default {
	storage: {
		type: {
			doc: 'Name the storage type.',
			format: ['disk', 'memory', 's3'],
			default: 'memory',
		},
		path: {
			doc: 'The path to store the file at. Applies to storage types "disk" and "s3".',
			format: String,
			default: '/tmp',
		},
		bucket: {
			doc: 'The S3 bucket.',
			format: String,
			default: '',
		},
		acl: {
			doc: 'File upload ACL.',
			format: ['private', 'public-read'],
			default: 'private',
		},
		accessKey: {
			doc: 'Access key for the s3 bucket.',
			format: String,
			default: '',
		},
		secretKey: {
			doc: 'Secret key for the s3 bucket.',
			format: String,
			default: '',
			sensitive: true,
		},
	},
	limits: {
		fileSize: {
			doc: 'The max file size (in bytes).',
			format: 'int',
			default: 10*1024*1024,
		},
	},
};
