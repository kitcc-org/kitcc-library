import { userTable } from '@/drizzle/schema';
import app from '@/src/index';
import { env } from 'cloudflare:test';
import { count } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { loggedInTest } from '../context/login';
import { userFactory } from '../factories/user';

describe('GET /users', () => {
	const db = drizzle(env.DB);
	const users = userFactory.buildList(5);

	beforeAll(async () => {
		await db.insert(userTable).values(users);
	});

	afterAll(async () => {
		await db.delete(userTable);
		userFactory.resetSequenceNumber();
	});

	it('should return correct number of users', async () => {
		const limit = 3;

		// prettier-ignore
		const params = new URLSearchParams({ page: '1', limit: limit.toString() }).toString();
		const response = await app.request(`/users?${params}`, {}, env);
		const users = await response.json();

		expect(response.status).toBe(200);
		expect(users).toHaveLength(limit);
	});

	it('should return specified user', async () => {
		const firstUser = { ...users[0], id: 1, sessionToken: null };

		const params = new URLSearchParams({ email: firstUser.email }).toString();
		const response = await app.request(`/users?${params}`, {}, env);
		const result = await response.json();

		expect(response.status).toBe(200);
		expect(result).toContainEqual(firstUser);
	});

	it('should return 400 when page is not a number', async () => {
		// pageに数字以外を指定する
		const params = new URLSearchParams({ page: 'a' }).toString();
		const response = await app.request(`/users?${params}`, {}, env);

		expect(response.status).toBe(400);
	});

	it('should return 400 when limit is not a number', async () => {
		// limitに数字以外を指定する
		const params = new URLSearchParams({ limit: 'a' }).toString();
		const response = await app.request(`/users?${params}`, {}, env);

		expect(response.status).toBe(400);
	});
});

describe('POST /users', () => {
	const db = drizzle(env.DB);

	afterAll(() => {
		userFactory.resetSequenceNumber();
	});

	loggedInTest(
		'should create new user',
		async ({ currentUser, sessionToken }) => {
			const newUser = userFactory.build();

			const response = await app.request(
				'/users',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify({
						...newUser,
						password: 'passw0rd',
					}),
				},
				env
			);

			expect(response.status).toBe(201);

			// データベースにユーザが登録されていることを確認する
			const totalUser = await db.select({ count: count() }).from(userTable);
			expect(totalUser[0].count).toBe(2);
		}
	);

	loggedInTest(
		'should return 400 when name is missing',
		async ({ currentUser, sessionToken }) => {
			// ユーザ名を指定しない
			const newUser = userFactory.build({ name: undefined });

			const response = await app.request(
				'/users',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify({
						...newUser,
						password: 'passw0rd',
					}),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	loggedInTest(
		'should return 400 when email is missing',
		async ({ currentUser, sessionToken }) => {
			// メールアドレスを指定しない
			const newUser = userFactory.build({ email: undefined });

			const response = await app.request(
				'/users',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify({
						...newUser,
						password: 'passw0rd',
					}),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	loggedInTest(
		'should return 400 when password is missing',
		async ({ currentUser, sessionToken }) => {
			const newUser = userFactory.build();

			const response = await app.request(
				'/users',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify(newUser),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	it('should return 401 when not logged in', async () => {
		const newUser = userFactory.build();

		const response = await app.request(
			'/users',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					// Cookieを指定しない
				},
				body: JSON.stringify({
					...newUser,
					password: 'passw0rd',
				}),
			},
			env
		);

		expect(response.status).toBe(401);
	});

	loggedInTest(
		'should return 409 when email is already used',
		async ({ currentUser, sessionToken }) => {
			const newUser = userFactory.build();
			// 先にデータベースに登録しておく
			await db.insert(userTable).values(newUser);

			const response = await app.request(
				'/users',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify({
						name: newUser.name,
						// すでに登録されているメールアドレスを指定する
						email: newUser.email,
						password: 'passw0rd',
					}),
				},
				env
			);

			expect(response.status).toBe(409);
		}
	);
});
