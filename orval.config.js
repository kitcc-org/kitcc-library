module.exports = {
  library: {
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
