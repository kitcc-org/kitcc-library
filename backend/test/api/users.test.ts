import { userTable } from '@/drizzle/schema';
import app from '@/src/index';
import { env } from 'cloudflare:test';
import { count } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
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

	it('should create new user', async () => {
		const response = await app.request(
			'/users',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: 'username',
					email: 'username@example.com',
					password: 'password',
				}),
			},
			env
		);

		expect(response.status).toBe(201);

		const totalUser = await db.select({ count: count() }).from(userTable);
		expect(totalUser[0].count).toBe(1);
	});

	it('should return 400 when name is missing', async () => {
		// ユーザ名を指定しない
		const user = userFactory.build({ name: undefined });

		const response = await app.request(
			'/users',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			},
			env
		);

		expect(response.status).toBe(400);
	});

	it('should return 400 when email is missing', async () => {
		// メールアドレスを指定しない
		const user = userFactory.build({ email: undefined });

		const response = await app.request(
			'/users',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			},
			env
		);

		expect(response.status).toBe(400);
	});

	it('should return 400 when password is missing', async () => {
		const response = await app.request(
			'/users',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: 'username',
					email: 'username@example.com',
					// パスワードを指定しない
				}),
			},
			env
		);

		expect(response.status).toBe(400);
	});

	// TODO:未ログインの時

	it('should return 409 when email is already used', async () => {
		const user = userFactory.build();
		// 先にデータベースに登録しておく
		await db.insert(userTable).values(user);

		const response = await app.request(
			'/users',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: user.name,
					// すでに登録されているメールアドレスを指定する
					email: user.email,
					password: 'password',
				}),
			},
			env
		);

		expect(response.status).toBe(409);
	});
});
