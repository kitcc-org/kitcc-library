import { userTable } from '@/drizzle/schema';
import app from '@/src/index';
import { generateHash } from '@/src/utils/crypto';
import { env } from 'cloudflare:test';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { loggedInTest } from '../context/login';
import { userFactory } from '../factories/user';

describe('POST /auth', async () => {
	const db = drizzle(env.DB);

	const password = 'password';
	const digest = await generateHash(password);
	const user = userFactory.build({ passwordDigest: digest });

	beforeAll(async () => {
		// prettier-ignore
		await db.insert(userTable).values(user);
	});

	afterAll(async () => {
		await db.delete(userTable);
		userFactory.resetSequenceNumber();
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
					email: user.email,
					password: password,
				}),
			},
			env
		);

		// ステータスコード
		expect(response.status).toBe(200);

		// レスポンスボディ
		const currentUser = await response.json();
		expect(currentUser).toMatchObject(user);

		// Cookie
		const cookies = response.headers.get('Set-Cookie');
		expect(cookies).toContain('user_id=');
		expect(cookies).toContain('session_token=');

		// データベースの値
		const selectUser = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, user.email));

		expect(selectUser[0].sessionToken).not.toBeNull();
	});

	loggedInTest(
		'should login successfully even if already logged in',
		async ({ password, user, sessionToken }) => {
			const response = await app.request(
				'/auth',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${user.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify({
						email: user.email,
						password: password,
					}),
				},
				env
			);

			expect(response.status).toBe(200);

			const currentUser = await response.json();
			expect(currentUser).toMatchObject(user);
		}
	);

	it('should return 400 when email is missing', async () => {
		const response = await app.request(
			'/auth',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					password: password,
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
					email: user.email,
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
					email: user.email,
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
					password: password,
				}),
			},
			env
		);

		expect(response.status).toBe(404);
	});
});

describe('DELETE /auth', async () => {
	const db = drizzle(env.DB);

	loggedInTest('should logout successfully', async ({ user, sessionToken }) => {
		const response = await app.request(
			'/auth',
			{
				method: 'DELETE',
				headers: {
					Cookie: [
						`__Secure-user_id=${user.id}`,
						`__Secure-session_token=${sessionToken}`,
					].join('; '),
				},
			},
			env
		);

		expect(response.status).toBe(200);

		const selectUser = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, user.email));

		expect(selectUser[0].sessionToken).toBeNull();
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
