module.exports = {
  frontend: {
    input: {
      target: './api/bundle.yml',
    },
    output: {
      client: 'react-query',
      httpClient: 'fetch',
      mode: 'split',
      target: './frontend/orval',
      baseUrl: 'http://localhost:8787' // build時には削除
    },
  },
};
