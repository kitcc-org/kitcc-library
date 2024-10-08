import { bookTable } from '@/drizzle/schema';
import app from '@/src/index';
import { env } from 'cloudflare:test';
import { count, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { bookFactory } from '../factories/book';

describe('GET /books', () => {
	const db = drizzle(env.DB);
	const books = bookFactory.buildList(10);

	beforeAll(async () => {
		await db.insert(bookTable).values(books);
	});

	afterAll(async () => {
		for (const book of books) {
			await db.delete(bookTable).where(eq(bookTable.isbn, book.isbn));
		}
	});

	it('should return 1 page', async () => {
		const params = new URLSearchParams({ page: '1', limit: '5' }).toString();
		const response = await app.request(`/books?${params}`, {}, env);
		const books = await response.json();

		expect(response.status).toBe(200);
		expect(books).toHaveLength(5);
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

	it('should create book', async () => {
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

	it('should return 400 when author is missing', async () => {
		const book = bookFactory.build({ author: undefined });

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
});
