import { userTable } from '@/drizzle/schema';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
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
				},
				400
			);
		}
	}),
	async (ctx) => {
		const credential = ctx.req.valid('json');

		const db = drizzle(ctx.env.DB);
		// データベースからユーザを取得する
		const user = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, credential.email));

		// ユーザが存在しない場合
		if (user.length === 0) {
			return ctx.notFound();
		}

		// ログイン済みか確認する
		const loggedIn = await isLoggedIn(ctx);
		if (!loggedIn) {
			// パスワードが正しいか確認する
			const hash = await generateHash(credential.password);
			if (hash === user[0].passwordDigest) {
				await login(ctx, user[0].id);
			} else {
				return ctx.json(
					{
						message: 'Unauthorized',
					},
					401
				);
			}
		}

		const result = loginResponse.safeParse(user[0]);
		if (!result.success) {
			return ctx.json(
				{
					message: 'Response Validation Error',
				},
				500
			);
		} else {
			return ctx.json(result.data);
		}
	}
);

app.delete('/', async (ctx) => {
	await logout(ctx);
	return ctx.json(
		{
			message: 'Goodbye',
		},
		200
	);
});

export default app;
