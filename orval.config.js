module.exports = {
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
  frontend: {
    input: {
      target: './api/bundle.yml',
    },
    output: {
      client: 'react-query',
      httpClient: 'fetch',
      mode: 'split',
      target: './frontend/orval',
    },
  },
};
