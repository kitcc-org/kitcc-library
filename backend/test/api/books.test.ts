import { bookTable } from '@/drizzle/schema';
import app from '@/src/index';
import { env } from 'cloudflare:test';
import { count, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { bookFactory } from '../factories/book';

describe('GET /books', () => {
	const db = drizzle(env.DB);
	const books = bookFactory.buildList(5);

	beforeAll(async () => {
		await db.insert(bookTable).values(books);
	});

	afterAll(async () => {
		for (const book of books) {
			await db.delete(bookTable).where(eq(bookTable.isbn, book.isbn));
		}

		bookFactory.resetSequenceNumber();
	});

	it('should return 1 page', async () => {
		const limit = 3;

		// prettier-ignore
		const params = new URLSearchParams({ page: '1', limit: limit.toString() }).toString();
		const response = await app.request(`/books?${params}`, {}, env);
		const books = await response.json();

		expect(response.status).toBe(200);
		expect(books).toHaveLength(limit);
	});

	it('should return specified book', async () => {
		const firstBook = { id: 1, ...books[0] };

		const params = new URLSearchParams({ title: firstBook.title }).toString();
		const response = await app.request(`/books?${params}`, {}, env);
		const result = await response.json();

		expect(response.status).toBe(200);
		expect(result).toContainEqual(firstBook);
	});

	it('should return 400 when page is not a number', async () => {
		const params = new URLSearchParams({ page: 'a' }).toString();
		const response = await app.request(`/books?${params}`, {}, env);

		expect(response.status).toBe(400);
	});

	it('should return 400 when limit is not a number', async () => {
		const params = new URLSearchParams({ limit: 'a' }).toString();
		const response = await app.request(`/books?${params}`, {}, env);

		expect(response.status).toBe(400);
	});
});

describe('POST /books', () => {
	const db = drizzle(env.DB);

	afterAll(() => {
		bookFactory.resetSequenceNumber();
	});

	it('should create new book', async () => {
		const book = bookFactory.build();
		const response = await app.request(
			'/books',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(book),
			},
			env
		);

		expect(response.status).toBe(201);

		const totalBook = await db.select({ count: count() }).from(bookTable);
		expect(totalBook[0].count).toBe(1);
	});

	it('should increase stock when book is already registered', async () => {
		const book = bookFactory.build();
		await db.insert(bookTable).values(book);

		const response = await app.request(
			'/books',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(book),
			},
			env
		);

		expect(response.status).toBe(201);

		const totalBook = await db
			.select({
				count: count(),
				stock: bookTable.stock,
			})
			.from(bookTable)
			.where(eq(bookTable.isbn, book.isbn));
		expect(totalBook[0].count).toBe(1);
		expect(totalBook[0].stock).toBe(book.stock! + 1);
	});

	it('should return 400 when title is missing', async () => {
		const book = bookFactory.build({ title: undefined });

		const response = await app.request(
			'/books',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(book),
			},
			env
		);

		expect(response.status).toBe(400);
	});

	it('should return 400 when authors is missing', async () => {
		const book = bookFactory.build({ authors: undefined });

		const response = await app.request(
			'/books',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(book),
			},
			env
		);

		expect(response.status).toBe(400);
	});

	it('should return 400 when publisher is missing', async () => {
		const book = bookFactory.build({ publisher: undefined });

		const response = await app.request(
			'/books',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(book),
			},
			env
		);

		expect(response.status).toBe(400);
	});

	it('should return 400 when isbn is missing', async () => {
		const book = bookFactory.build({ isbn: undefined });

		const response = await app.request(
			'/books',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(book),
			},
			env
		);

		expect(response.status).toBe(400);
	});

	it('should return 400 when stock is missing', async () => {
		const book = bookFactory.build({ stock: undefined });

		const response = await app.request(
			'/books',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(book),
			},
			env
		);

		expect(response.status).toBe(400);
	});

	// TODO:未ログインの時
});

describe('GET /books/search', () => {
	it('should return 400 when page is not a number', async () => {
		const response = await app.request('/books/search?page=a', {}, env);

		expect(response.status).toBe(400);
	});

	it('should return 400 when limit is not a number', async () => {
		const response = await app.request('/books/search?limit=a', {}, env);

		expect(response.status).toBe(400);
	});

	it('should return 400 when isbn is not 13 digits number', async () => {
		// prettier-ignore
		const response = await app.request('/books/search?isbn=0123456789', {}, env);

		expect(response.status).toBe(400);
	});
});
