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
			published_date TEXT NOT NULL,
			description TEXT,
			thumbnail TEXT,
			isbn TEXT NOT NULL,
			stock INTEGER DEFAULT 1 NOT NULL
		);
    `,
	)
	.run();

await db
	.prepare(
		`
    CREATE UNIQUE INDEX IF NOT EXISTS isbn_idx ON books (isbn)
    `,
	)
	.run();

await db
	.prepare(
		`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      password_digest TEXT NOT NULL,
      session_token TEXT
    );
    `,
	)
	.run();

await db
	.prepare(
		`
    CREATE UNIQUE INDEX IF NOT EXISTS email_idx ON users (email)
    `,
	)
	.run();

await db
	.prepare(
		`
    CREATE TABLE IF NOT EXISTS loans (
      user_id INTEGER NOT NULL,
      book_id INTEGER NOT NULL,
      volume INTEGER DEFAULT 1 NOT NULL,
      created_at INTEGER DEFAULT (unixepoch()) NOT NULL,
      updated_at INTEGER DEFAULT (unixepoch()) NOT NULL,
      PRIMARY KEY(user_id, book_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE NO ACTION ON DELETE CASCADE,
      FOREIGN KEY (book_id) REFERENCES books(id) ON UPDATE NO ACTION ON DELETE CASCADE
    );
    `,
	)
	.run();
