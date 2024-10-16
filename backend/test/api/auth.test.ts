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

		// データベースのsession_token
		const selectUser = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, user.email));
		expect(selectUser[0].sessionToken).not.toBeNull();
	});

	loggedInTest(
		'should login successfully when try to log in as same user',
		async ({ password, currentUser, sessionToken }) => {
			const response = await app.request(
				'/auth',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						// Cookieを指定してログイン済みの状態を再現する
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					// 他のユーザとしてログインを試みる
					body: JSON.stringify({
						email: currentUser.email,
						password: password,
					}),
				},
				env
			);

			// ステータスコード
			expect(response.status).toBe(200);

			// レスポンスボディ
			const selectUser = await response.json();
			expect(selectUser).toMatchObject(currentUser);
		}
	);

	loggedInTest(
		'should fail to login when try to login as other user',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				'/auth',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						// Cookieを指定してログイン済みの状態を再現する
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					// 他のユーザとしてログインを試みる
					body: JSON.stringify({
						email: user.email,
						password: password,
					}),
				},
				env
			);

			// ステータスコード
			expect(response.status).toBe(401);
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
					// メールアドレスを指定しない
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
					// パスワードを指定しない
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
					// 間違ったパスワードを指定する
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
					// 存在しないメールアドレスを指定する
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

	loggedInTest(
		'should logout successfully',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				'/auth',
				{
					method: 'DELETE',
					headers: {
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
				},
				env
			);

			expect(response.status).toBe(200);

			// データベースのsesson_tokenが削除されていることをテストする
			const selectUser = await db
				.select()
				.from(userTable)
				.where(eq(userTable.email, currentUser.email));
			expect(selectUser[0].sessionToken).toBeNull();
		}
	);

	it('should logout successfully even when not logged in', async () => {
		const response = await app.request(
			'/auth',
			{
				method: 'DELETE',
				// Cookieを指定しない
			},
			env
		);

		expect(response.status).toBe(200);
	});
});
