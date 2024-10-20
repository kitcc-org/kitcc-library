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
      baseUrl: 'http://localhost:8787' // build時には削除
    },
  },
};
