import { relations, sql } from 'drizzle-orm';
import {
	integer,
	primaryKey,
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

// prettier-ignore
export const booksRelation = relations(
	bookTable,
	({ many }) => ({
		booksToUsers: many(loanTable),
	})
);

export const userTable = sqliteTable(
	'users',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		name: text('name').notNull(),
		email: text('email').notNull(),
		passwordDigest: text('password_digest').notNull(),
		sessionToken: text('session_token'),
	},
	(table) => {
		return {
			emailIndex: uniqueIndex('email_idx').on(table.email),
		};
	}
);

export type SelectUser = typeof userTable.$inferSelect;
export type InsertUser = typeof userTable.$inferInsert;

// prettier-ignore
export const usersRelation = relations(
	userTable,
	({ many }) => ({
		usersToBooks: many(loanTable),
	})
);

export const loanTable = sqliteTable(
	'loans',
	{
		bookId: integer('book_id')
			.notNull()
			.references(() => bookTable.id, { onDelete: 'cascade' }),
		userId: integer('user_id')
			.notNull()
			.references(() => userTable.id, { onDelete: 'cascade' }),
		volume: integer('volume').notNull().default(1),
		createdAt: text('created_at')
			.notNull()
			.default(sql`(datetime(current_timestamp, '+9 hours'))`),
		updatedAt: text('updated_at')
			.notNull()
			.default(sql`(datetime(current_timestamp, '+9 hours'))`),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.bookId, table.userId] }),
		};
	}
);

export type SelectLoan = typeof loanTable.$inferSelect;
export type InsertLoan = typeof loanTable.$inferInsert;
