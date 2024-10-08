import { bookTable } from '@/drizzle/schema';
import app from '@/src/index';
import { env } from 'cloudflare:test';
import { eq } from 'drizzle-orm';
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
