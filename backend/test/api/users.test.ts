import { userTable } from '@/drizzle/schema';
import app from '@/src/index';
import { env } from 'cloudflare:test';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { userFactory } from '../factories/user';

describe('GET /users', () => {
	const db = drizzle(env.DB);
	const users = userFactory.buildList(5);

	beforeAll(async () => {
		await db.insert(userTable).values(users);
	});

	afterAll(async () => {
		for (const book of users) {
			await db.delete(userTable).where(eq(userTable.email, book.email));
		}

		userFactory.resetSequenceNumber();
	});

	it('should return 1 page', async () => {
		const limit = 3;

		// prettier-ignore
		const params = new URLSearchParams({ page: '1', limit: limit.toString() }).toString();
		const response = await app.request(`/users?${params}`, {}, env);
		const users = await response.json();

		expect(response.status).toBe(200);
		expect(users).toHaveLength(limit);
	});

	it('should return specified book', async () => {
		const firstUser = { id: 1, ...users[0] };

		const params = new URLSearchParams({ email: firstUser.email }).toString();
		const response = await app.request(`/users?${params}`, {}, env);
		const result = await response.json();

		expect(response.status).toBe(200);
		expect(result).toContainEqual(firstUser);
	});

	it('should return 400 when page is not a number', async () => {
		const params = new URLSearchParams({ page: 'a' }).toString();
		const response = await app.request(`/users?${params}`, {}, env);

		expect(response.status).toBe(400);
	});

	it('should return 400 when limit is not a number', async () => {
		const params = new URLSearchParams({ limit: 'a' }).toString();
		const response = await app.request(`/users?${params}`, {}, env);

		expect(response.status).toBe(400);
	});
});
