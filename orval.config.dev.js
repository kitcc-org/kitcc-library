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
};
