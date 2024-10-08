import { defineConfig } from 'drizzle-kit';
import { readdirSync } from 'node:fs';

const dirpath = '.wrangler/state/v3/d1/miniflare-D1DatabaseObject';

const files = readdirSync(dirpath);
const database = files.find((file) => file.endsWith('.sqlite'));

if (!database) {
	throw new Error('No sqlite file found');
}

export default defineConfig({
	dialect: 'sqlite',
	schema: './drizzle/schema.ts',
	out: './drizzle/migrations',
	dbCredentials: {
		url: `${dirpath}/${database}`,
	},
});
