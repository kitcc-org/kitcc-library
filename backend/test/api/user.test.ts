import { userTable } from '@/drizzle/schema';
import app from '@/src/index';
import { env } from 'cloudflare:test';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { userFactory } from '../factories/user';

describe('GET /users/:userId', () => {
	const db = drizzle(env.DB);
	const user = userFactory.build();

	beforeAll(async () => {
		await db.insert(userTable).values(user);
	});

	afterAll(async () => {
		await db.delete(userTable).where(eq(userTable.email, user.email));
		userFactory.resetSequenceNumber();
	});

	it('should return correct user', async () => {
		const response = await app.request(`/users/1`, {}, env);
		const result = await response.json();

		expect(response.status).toBe(200);
		expect(result).toMatchObject(user);
	});

	it('should return 400 when userId is not a number', async () => {
		const response = await app.request(`/users/id`, {}, env);

		expect(response.status).toBe(400);
	});

	it('should return 404 when user is not found', async () => {
		const response = await app.request(`/users/100`, {}, env);

		expect(response.status).toBe(404);
	});
});
