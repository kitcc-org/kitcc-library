import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';
import path from 'node:path';

export default defineWorkersConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname),
		},
	},
	test: {
		globals: true,
		poolOptions: {
			workers: {
				miniflare: {
					d1Databases: ['DB'],
				},
				wrangler: { configPath: './wrangler.toml' },
			},
		},
		setupFiles: ['./test/setup.ts'],
	},
});
