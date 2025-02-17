import { userTable } from '@/drizzle/schema';
import app from '@/src/index';
import { env } from 'cloudflare:test';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { loggedInTest } from '../context/login';
import { userFactory } from '../factories/user';

describe('GET /users/:userId', () => {
	const db = drizzle(env.DB);
	const user = userFactory.build();

	beforeAll(async () => {
		await db.insert(userTable).values(user);
	});

	afterAll(async () => {
		await db.delete(userTable);
		userFactory.resetSequenceNumber();
	});

	loggedInTest(
		'should return correct user',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				`/users/${currentUser.id}`,
				{
					headers: {
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
				},
				env,
			);
			const result = await response.json();

			expect(response.status).toBe(200);

			const { passwordDigest, ...rest } = currentUser;
			expect(result).toMatchObject(rest);
		},
	);

	loggedInTest(
		'should return 400 when userId is not a number',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				// userIdに数字以外を指定する
				`/users/id`,
				{
					headers: {
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
				},
				env,
			);

			expect(response.status).toBe(400);
		},
	);

	it('should return 401 when not logged in', async () => {
		// Cookieを指定しない
		const response = await app.request(`/users/1`, {});

		expect(response.status).toBe(401);
	});

	loggedInTest(
		'should return 404 when user is not found',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				// 存在しないuserIdを指定する
				`/users/100`,
				{
					headers: {
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
				},
				env,
			);

			expect(response.status).toBe(404);
		},
	);
});

describe('PATCH /users/:userId', () => {
	const db = drizzle(env.DB);
	const users = userFactory.buildList(2);

	beforeEach(async () => {
		await db.insert(userTable).values(users);
	});

	afterEach(async () => {
		await db.delete(userTable);
	});

	afterAll(() => {
		userFactory.resetSequenceNumber();
	});

	loggedInTest('should update user', async ({ currentUser, sessionToken }) => {
		const credentials = {
			name: '比企谷八幡',
			email: 'hikigaya@oregairu.com',
			currentPassword: 'passw0rd',
			newPassword: 'pa55word',
		};

		const response = await app.request(
			`/users/${currentUser.id}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Cookie: [
						`__Secure-user_id=${currentUser.id}`,
						`__Secure-session_token=${sessionToken}`,
					].join('; '),
				},
				body: JSON.stringify(credentials),
			},
			env,
		);

		expect(response.status).toBe(200);

		// データベースの値が更新されていることを確認する
		const updatedUser = await db
			.select()
			.from(userTable)
			.where(eq(userTable.id, currentUser.id!));
		expect(updatedUser[0].name).toBe(credentials.name);
		expect(updatedUser[0].email).toBe(credentials.email);
	});

	loggedInTest(
		'should return 400 when userId is not a number',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				// userIdに数字以外を指定する
				`/users/id`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify({ name: 'username' }),
				},
				env,
			);

			expect(response.status).toBe(400);
		},
	);

	loggedInTest(
		'should return 400 when name is not a string',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				`/users/${currentUser.id}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					// ユーザ名に文字列以外を指定する
					body: JSON.stringify({ name: 1 }),
				},
				env,
			);

			expect(response.status).toBe(400);
		},
	);

	loggedInTest(
		'should return 400 when email is invalid',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				`/users/${currentUser.id}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					// メールアドレスが形式に合っていない
					body: JSON.stringify({ email: 'user@invalid' }),
				},
				env,
			);

			expect(response.status).toBe(400);
		},
	);

	loggedInTest(
		'should return 400 when password is invalid',
		async ({ currentUser, sessionToken }) => {
			const invalidPassword = [
				'abc123', // 文字数が8文字未満
				'12345678', // 英字が含まれていない
				'password', // 数字が含まれていない
			];

			for (const password of invalidPassword) {
				const response = await app.request(
					`/users/${currentUser.id}`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							Cookie: [
								`__Secure-user_id=${currentUser.id}`,
								`__Secure-session_token=${sessionToken}`,
							].join('; '),
						},
						// パスワードに文字列以外を指定する
						body: JSON.stringify({ password: password }),
					},
					env,
				);

				expect(response.status).toBe(400);
			}
		},
	);

	loggedInTest(
		'should return 400 when current password is incorrect',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				`/users/${currentUser.id}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify({
						currentPassword: 'abcd1234',
						newPassword: 'pa55word',
					}),
				},
				env,
			);

			expect(response.status).toBe(400);
		},
	);

	loggedInTest(
		'should return 400 when violate email unique constraint',
		async ({ currentUser, sessionToken }) => {
			const users = await db.select().from(userTable);

			const response = await app.request(
				`/users/${currentUser.id}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					// 既に存在するメールアドレスを指定する
					body: JSON.stringify({ email: users[0].email }),
				},
				env,
			);

			expect(response.status).toBe(400);
		},
	);

	it('should return 401 when not logged in', async () => {
		// prettier-ignore
		const response = await app.request(
			`/users/1`,
			{
				method: 'PATCH',
				body: JSON.stringify({ name: '比企谷八幡' }),
			}
		);

		expect(response.status).toBe(401);
	});
});

describe('DELETE /users/:userId', () => {
	const db = drizzle(env.DB);
	const user = userFactory.build();

	beforeEach(async () => {
		await db.insert(userTable).values(user);
	});

	afterEach(async () => {
		await db.delete(userTable);
	});

	afterAll(() => {
		userFactory.resetSequenceNumber();
	});

	loggedInTest('should delete user', async ({ currentUser, sessionToken }) => {
		const users = await db.select().from(userTable);

		const response = await app.request(
			`/users/${users[0].id}`,
			{
				method: 'DELETE',
				headers: {
					Cookie: [
						`__Secure-user_id=${currentUser.id}`,
						`__Secure-session_token=${sessionToken}`,
					].join('; '),
				},
			},
			env,
		);

		expect(response.status).toBe(204);

		// データベースからユーザが削除されていることを確認する
		const deletedBook = await db
			.select()
			.from(userTable)
			.where(eq(userTable.id, users[0].id));
		expect(deletedBook).toHaveLength(0);
	});

	loggedInTest(
		'should return 400 when userId is not a number',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				// userIdに数字以外を指定する
				`/users/id`,
				{
					method: 'DELETE',
					headers: {
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
				},
				env,
			);

			expect(response.status).toBe(400);
		},
	);

	it('should return 401 when not logged in', async () => {
		const response = await app.request(
			`/users/1`,
			{
				method: 'DELETE',
				// Cookieを指定しない
			},
			env,
		);

		expect(response.status).toBe(401);
	});

	loggedInTest(
		'should return 404 when user is not found',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				// 存在しないuserIdを指定する
				`/users/100`,
				{
					method: 'DELETE',
					headers: {
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
				},
				env,
			);

			expect(response.status).toBe(404);
		},
	);
});
