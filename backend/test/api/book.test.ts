import { bookTable } from '@/drizzle/schema';
import app from '@/src/index';
import { env } from 'cloudflare:test';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { bookFactory } from '../factories/book';

describe('GET /books/:bookId', () => {
	const db = drizzle(env.DB);
	const book = bookFactory.build();

	beforeAll(async () => {
		await db.insert(bookTable).values(book);
	});

	afterAll(async () => {
		await db.delete(bookTable).where(eq(bookTable.isbn, book.isbn));
		bookFactory.resetSequenceNumber();
	});

	it('should return correct book', async () => {
		const response = await app.request(`/books/1`, {}, env);
		const result = await response.json();

		expect(response.status).toBe(200);
		expect(result).toMatchObject(book);
	});

	it('should return 400 when bookId is not a number', async () => {
		const response = await app.request(`/books/id`, {}, env);

		expect(response.status).toBe(400);
	});

	it('should return 404 when book is not found', async () => {
		const response = await app.request(`/books/100`, {}, env);

		expect(response.status).toBe(404);
	});
});

describe('PUT /books/:bookId', () => {
	const db = drizzle(env.DB);
	const books = bookFactory.buildList(2);

	beforeEach(async () => {
		await db.insert(bookTable).values(books);
	});

	afterEach(async () => {
		for (const book of books) {
			await db.delete(bookTable).where(eq(bookTable.isbn, book.isbn));
		}
	});

	afterAll(() => {
		bookFactory.resetSequenceNumber();
	});

	it('should update book', async () => {
		const book = {
			title: '計算機プログラムの構造と解釈',
			// prettier-ignore
			authors: [
				'Harold Abelson',
				'Gerald Jay Sussman',
				'Julie Sussman'
			],
			publisher: '翔泳社',
			isbn: '9784798135984',
			stock: 1,
		};

		const books = await db.select().from(bookTable);
		const response = await app.request(
			`/books/${books[0].id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(book),
			},
			env
		);

		expect(response.status).toBe(200);

		const updatedBook = await db
			.select()
			.from(bookTable)
			.where(eq(bookTable.id, books[0].id));
		expect(updatedBook[0]).toMatchObject(book);
	});

	it('should return 400 when violate ISBN unique constraint', async () => {
		const books = await db.select().from(bookTable);

		const response = await app.request(
			`/books/${books[1].id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ isbn: books[0].isbn }),
			},
			env
		);

		expect(response.status).toBe(400);
	});

	// TODO:未ログインの時

	it('should return 404 when book is not found', async () => {
		const response = await app.request(
			`/books/100`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title: 'New Title' }),
			},
			env
		);

		expect(response.status).toBe(404);
	});
});

describe('DELETE /books/:bookId', () => {
	const db = drizzle(env.DB);
	const book = bookFactory.build();

	beforeEach(async () => {
		await db.insert(bookTable).values(book);
	});

	afterEach(async () => {
		await db.delete(bookTable).where(eq(bookTable.isbn, book.isbn));
	});

	afterAll(() => {
		bookFactory.resetSequenceNumber();
	});

	it('should delete book', async () => {
		const books = await db.select().from(bookTable);

		const response = await app.request(
			`/books/${books[0].id}`,
			{
				method: 'DELETE',
			},
			env
		);

		expect(response.status).toBe(204);

		const deletedBook = await db
			.select()
			.from(bookTable)
			.where(eq(bookTable.id, books[0].id));
		expect(deletedBook).toHaveLength(0);
	});

	it('should return 400 when bookId is not a number', async () => {
		const response = await app.request(
			`/books/id`,
			{
				method: 'DELETE',
			},
			env
		);

		expect(response.status).toBe(400);
	});

	// TODO:未ログインの時

	it('should return 404 when book is not found', async () => {
		const response = await app.request(
			`/books/100`,
			{
				method: 'DELETE',
			},
			env
		);

		expect(response.status).toBe(404);
	});
});
