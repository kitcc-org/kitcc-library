module.exports = {
  client: {
    input: {
      target: './api/bundle.yml',
    },
    output: {
      client: 'react-query',
      httpClient: 'fetch',
      mode: 'split',
      target: './frontend/orval/client.ts',
      baseUrl: 'https://localhost:8787',
      override: {
        mutator: {
          path: './frontend/orval/mutator.ts',
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
      mock: true,
      mode: 'single',
      target: './frontend/test/mocks/mock.ts',
      schemas: './frontend/test/mocks/model',
      override: {
        // なぜかタイトルが上書きされない
        title: 'TestAPI'
      }
    },
  },
};
