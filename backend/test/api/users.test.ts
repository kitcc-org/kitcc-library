import { SelectUser, userTable } from '@/drizzle/schema';
import app from '@/src/index';
import { env } from 'cloudflare:test';
import { count } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { loggedInTest } from '../context/login';
import { userFactory } from '../factories/user';

interface GetUsersResponse {
	totalUser: number;
	users: SelectUser[];
}

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

		expect(response.status).toBe(200);

		const body: GetUsersResponse = await response.json();
		expect(body.totalUser).toBe(5);
		expect(body.users).toHaveLength(limit);
	});

	it('should return empty array when page is out of range', async () => {
		const params = new URLSearchParams({ page: '3', limit: '3' }).toString();
		const response = await app.request(`/users?${params}`, {}, env);

		expect(response.status).toBe(200);

		const body: GetUsersResponse = await response.json();
		expect(body.users).toHaveLength(0);
	});

	it('should return correct user', async () => {
		const firstUser = {
			id: 1,
			name: users[0].name,
			email: users[0].email,
			sessionToken: null,
		};

		const params = new URLSearchParams({ email: firstUser.email }).toString();
		const response = await app.request(`/users?${params}`, {}, env);

		expect(response.status).toBe(200);

		const body: GetUsersResponse = await response.json();
		expect(body.totalUser).toBe(1);
		expect(body.users).toContainEqual(firstUser);
	});

	it('should return 400 when page is not a number', async () => {
		// pageに数字以外を指定する
		const response = await app.request(`/users?page=a`, {}, env);

		expect(response.status).toBe(400);
	});

	it('should return 400 when limit is not a number', async () => {
		// limitに数字以外を指定する
		const response = await app.request('/users?limit=a', {}, env);

		expect(response.status).toBe(400);
	});
});

describe('POST /users', () => {
	const db = drizzle(env.DB);

	afterAll(async () => {
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
				env,
			);

			// ステータスコード
			expect(response.status).toBe(201);

			// レスポンスボディ
			const createdUser: SelectUser = await response.json();
			const { passwordDigest, ...rest } = newUser;
			expect(createdUser).toMatchObject(rest);

			// データベースにユーザが登録されていることを確認する
			const totalUser = await db.select({ count: count() }).from(userTable);
			expect(totalUser[0].count).toBe(2);
		},
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
				env,
			);

			expect(response.status).toBe(400);
		},
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
				env,
			);

			expect(response.status).toBe(400);
		},
	);

	loggedInTest(
		'should return 400 when email is invalid',
		async ({ currentUser, sessionToken }) => {
			// 不正な形式のメールアドレス
			const newUser = userFactory.build({ email: 'user@invalid' });

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
				env,
			);

			expect(response.status).toBe(400);
		},
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
				env,
			);

			expect(response.status).toBe(400);
		},
	);

	loggedInTest(
		'should return 400 when password is invalid',
		async ({ currentUser, sessionToken }) => {
			const newUser = userFactory.build();
			const invalidPassword = [
				'abc123', // 文字数が8未満
				'12345678', // 英字が含まれていない
				'password', // 数字が含まれていない
			];

			for (const password of invalidPassword) {
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
							password: password,
						}),
					},
					env,
				);

				expect(response.status).toBe(400);
			}
		},
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
			env,
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
				env,
			);

			expect(response.status).toBe(409);
		},
	);
});

describe('DELETE /users', () => {
	const db = drizzle(env.DB);

	beforeAll(async () => {
		const users = userFactory.buildList(5);
		await db.insert(userTable).values(users);
	});

	afterAll(async () => {
		await db.delete(userTable);
		userFactory.resetSequenceNumber();
	});

	loggedInTest(
		'should delete users successfully',
		async ({ currentUser, sessionToken }) => {
			const before = await db.select({ count: count() }).from(userTable);

			const userIdList = [1, 2];

			const response = await app.request(
				'/users',
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify({ userIdList: userIdList }),
				},
				env,
			);

			// ステータスコード
			expect(response.status).toBe(204);

			// データベースからユーザが削除されていることを確認する
			const after = await db.select({ count: count() }).from(userTable);
			expect(after[0].count).toBe(before[0].count - userIdList.length);
		},
	);

	it('should return 400 when userIdList is not array', async () => {
		const response = await app.request(
			'/users',
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userIdList: 1 }),
			},
			env,
		);

		expect(response.status).toBe(400);
	});

	it('should return 401 when not logged in', async () => {
		const response = await app.request(
			'/users',
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userIdList: [1] }),
			},
			env,
		);

		expect(response.status).toBe(401);
	});
});
