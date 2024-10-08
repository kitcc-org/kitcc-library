import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const bookTable = sqliteTable(
	'books',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		title: text('title').notNull(),
		author: text('author', { mode: 'json' }).$type<string[]>().notNull(),
		publisher: text('publisher').notNull(),
		thumbnail: text('thumbnail'),
		isbn: text('isbn').notNull().unique(),
		stock: integer('stock').default(1),
	},
	(Books) => ({
		isbnIdx: uniqueIndex('isbn_idx').on(Books.isbn),
	})
);
