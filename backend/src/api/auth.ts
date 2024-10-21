import { userTable } from '@/drizzle/schema';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { loginBody, loginResponse } from '../schema';
import { isLoggedIn, login, logout } from '../utils/auth';
import { generateHash } from '../utils/crypto';

const app = new Hono<{ Bindings: Env }>();

app.post(
	'/',
	zValidator('json', loginBody, (result, ctx) => {
		if (!result.success) {
			return ctx.json(
				{
					message: 'Request Body Validation Error',
					error: result.error,
				},
				400,
			);
		}
	}),
	async (ctx) => {
		const credentials = ctx.req.valid('json');

		const db = drizzle(ctx.env.DB);
		// データベースからユーザを取得する
		let selectUser = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, credentials.email));

		// ユーザが存在しない場合
		if (selectUser.length === 0) {
			return ctx.notFound();
		}

		// ログイン済みか確認する
		const loggedIn = await isLoggedIn(ctx);
		if (!loggedIn) {
			// 未ログインの場合
			// パスワードが正しいか確認する
			const hash = await generateHash(credentials.password);
			if (hash === selectUser[0].passwordDigest) {
				selectUser = await login(ctx, selectUser[0].id);
			} else {
				return ctx.json(
					{
						message: 'Unauthorized',
					},
					401,
				);
			}
		} else {
			// ログイン済みの場合
			const cookie = getCookie(ctx, 'user_id', 'secure');
			const currentUserId = Number(cookie);
			if (currentUserId !== selectUser[0].id) {
				// 他のユーザとしてログインしようとした
				return ctx.json(
					{
						message: 'Unauthorized',
					},
					401,
				);
			}
		}

		const result = loginResponse.safeParse(selectUser[0]);
		if (!result.success) {
			console.error(result.error);
			return ctx.json(
				{
					message: 'Response Validation Error',
				},
				500,
			);
		} else {
			return ctx.json(result.data);
		}
	},
);

app.delete('/', async (ctx) => {
	await logout(ctx);
	return ctx.json({ message: 'Goodbye' }, 200);
});

export default app;
