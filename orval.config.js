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
