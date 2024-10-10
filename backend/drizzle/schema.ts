import {
	integer,
	sqliteTable,
	text,
	uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const bookTable = sqliteTable(
	'books',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		title: text('title').notNull(),
		authors: text('authors', { mode: 'json' }).$type<string[]>().notNull(),
		publisher: text('publisher').notNull(),
		thumbnail: text('thumbnail'),
		isbn: text('isbn').notNull().unique(),
		stock: integer('stock').notNull().default(1),
	},
	(table) => ({
		isbnIdx: uniqueIndex('isbn_idx').on(table.isbn),
	})
);

export type SelectBook = typeof bookTable.$inferSelect;
export type InsertBook = typeof bookTable.$inferInsert;

export const userTable = sqliteTable(
	'User',
	{
		user_id: integer('user_id').primaryKey({ autoIncrement: true }),
		name: text('name').notNull(),
		email: text('email').notNull(),
		password_digest: text('password_digest').notNull(),
	},
	(table) => {
		return {
			emailIndex: uniqueIndex('email_idx').on(table.email),
		};
	}
);
