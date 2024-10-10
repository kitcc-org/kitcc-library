import { env } from 'cloudflare:test';

const db = env.DB;

await db
	.prepare(
		`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      title TEXT NOT NULL,
      authors TEXT NOT NULL,
      publisher TEXT NOT NULL,
      thumbnail TEXT,
      isbn TEXT NOT NULL,
      stock INTEGER NOT NULL DEFAULT 1
    )
    `
	)
	.run();

await db
	.prepare(
		`
    CREATE UNIQUE INDEX IF NOT EXISTS isbn_idx ON books (isbn)
    `
	)
	.run();

await db
	.prepare(
		`
    CREATE TABLE User (
      user_id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      name text NOT NULL,
      email text NOT NULL,
      password_digest text NOT NULL
    );
    `
	)
	.run();

await db
	.prepare(
		`
    CREATE UNIQUE INDEX IF NOT EXISTS email_idx ON User (email)
    `
	)
	.run();
