import { userTable } from '@/drizzle/schema';
import app from '@/src/index';
import { generateHash } from '@/src/utils/crypto';
import { env } from 'cloudflare:test';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';

describe('POST /auth', async () => {
	const db = drizzle(env.DB);
	const account = {
		name: '比企谷八幡',
		email: 'hikigaya@oregairu.com',
		password: 'password',
	};
	const digest = await generateHash(account.password);

	beforeAll(async () => {
		// prettier-ignore
		await db
      .insert(userTable)
      .values({
        name: account.name,
        email: account.email,
        passwordDigest: digest,
      });
	});

	afterAll(async () => {
		await db.delete(userTable);
	});

	it('should login successfully', async () => {
		const response = await app.request(
			'/auth',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: account.email,
					password: account.password,
				}),
			},
			env
		);

		expect(response.status).toBe(200);

		const cookies = response.headers.get('Set-Cookie');
		expect(cookies).toContain('user_id=');
		expect(cookies).toContain('session_token=');

		const user = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, account.email));

		expect(user[0].sessionToken).not.toBeNull();
	});

	it('should login successfully even if already logged in', async () => {
		const response = await app.request(
			'/auth',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Set-Cookie': `__Secure-user_id=1; __Secure-session_token=${digest}`,
				},
				body: JSON.stringify({
					email: account.email,
					password: account.password,
				}),
			},
			env
		);

		expect(response.status).toBe(200);

		const cookies = response.headers.get('Set-Cookie');
		expect(cookies).toContain('user_id=');
		expect(cookies).toContain('session_token=');
	});

	it('should return 400 when email is missing', async () => {
		const response = await app.request(
			'/auth',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					password: account.password,
				}),
			},
			env
		);

		expect(response.status).toBe(400);
	});

	it('should return 400 when password is missing', async () => {
		const response = await app.request(
			'/auth',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: account.email,
				}),
			},
			env
		);

		expect(response.status).toBe(400);
	});

	it('should return 401 when password is wrong', async () => {
		const response = await app.request(
			'/auth',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: account.email,
					password: 'hoge',
				}),
			},
			env
		);

		expect(response.status).toBe(401);
	});

	it('should return 404 when account does not exist', async () => {
		const response = await app.request(
			'/auth',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: 'hoge@example.com',
					password: account.password,
				}),
			},
			env
		);

		expect(response.status).toBe(404);
	});
});

describe('DELETE /auth', async () => {
	const db = drizzle(env.DB);
	const account = {
		name: '比企谷八幡',
		email: 'hikigaya@oregairu.com',
		password: 'password',
	};
	const digest = await generateHash(account.password);

	beforeAll(async () => {
		// prettier-ignore
		await db
			.insert(userTable)
			.values({
				name: account.name,
				email: account.email,
				passwordDigest: digest,
				sessionToken: crypto.randomUUID(),
			});
	});

	afterAll(async () => {
		await db.delete(userTable);
	});

	it('should logout successfully', async () => {
		const response = await app.request(
			'/auth',
			{
				method: 'DELETE',
				headers: {
					Cookie: `__Secure-user_id=1; __Secure-session_token=${digest}`,
				},
			},
			env
		);

		expect(response.status).toBe(200);

		const user = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, account.email));

		expect(user[0].sessionToken).toBeNull();
	});

	it('should logout successfully even when not logged in', async () => {
		const response = await app.request(
			'/auth',
			{
				method: 'DELETE',
			},
			env
		);

		expect(response.status).toBe(200);
	});
});
