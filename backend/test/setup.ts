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
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      password_digest TEXT NOT NULL,
      session_token TEXT
    );
    `
	)
	.run();

await db
	.prepare(
		`
    CREATE UNIQUE INDEX IF NOT EXISTS email_idx ON users (email)
    `
	)
	.run();

await db
	.prepare(
		`
    CREATE TABLE loans (
      book_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      volume INTEGER DEFAULT 1 NOT NULL,
      created_at TEXT DEFAULT (datetime(current_timestamp, '+9 hours')) NOT NULL,
      updated_at TEXT DEFAULT (datetime(current_timestamp, '+9 hours')) NOT NULL,
      PRIMARY KEY(book_id, user_id),
      FOREIGN KEY (book_id) REFERENCES books(id) ON UPDATE no action ON DELETE cascade,
      FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE no action ON DELETE cascade
    );
    `
	)
	.run();
