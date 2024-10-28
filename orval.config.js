module.exports = {
	client: {
		input: {
			target: './api/bundle.yml',
		},
		output: {
			baseUrl: 'https://kitcc-library-api.kitcc.workers.dev',
			client: 'react-query',
			httpClient: 'fetch',
			mode: 'split',
			target: './frontend/client/client.ts',
			override: {
				mutator: {
					path: './frontend/client/mutator.ts',
					name: 'customFetch',
				},
			},
		},
	},
	zod: {
		input: {
			target: './api/bundle.yml',
		},
		output: {
			client: 'zod',
			mode: 'single',
			target: './backend/src/schema.ts',
		},
	},
};
