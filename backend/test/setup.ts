import { env } from 'cloudflare:test';

const db = env.DB;

await db
	.prepare(
		`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      publisher TEXT NOT NULL,
      thumbnail TEXT,
      isbn TEXT NOT NULL,
      stock INTEGER DEFAULT 1
    )
    `
	)
	.run();
