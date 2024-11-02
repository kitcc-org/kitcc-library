module.exports = {
	client: {
		input: {
			target: './api/bundle.yml',
		},
		output: {
			client: 'react-query',
			httpClient: 'fetch',
			mode: 'split',
			target: './frontend/client/client.ts',
			baseUrl: 'https://localhost:8787',
			override: {
				mutator: {
					path: './frontend/client/mutator.ts',
					name: 'customFetch',
				},
			},
		},
	},
	msw: {
		input: {
			target: './api/bundle.yml',
		},
		output: {
			baseUrl: 'https://localhost:8787',
			client: 'react-query',
			httpClient: 'fetch',
			mock: {
				type: 'msw',
				delay: false,
				useExamples: true,
			},
			mode: 'single',
			target: './frontend/test/mocks/mock.ts',
			schemas: './frontend/test/mocks/model',
			override: {
				// なぜかタイトルが上書きされない
				title: 'TestAPI',
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
