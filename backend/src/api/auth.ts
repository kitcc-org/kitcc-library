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
		const user = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, credential.email));

		const loggedIn = await isLoggedIn(ctx);
		if (!loggedIn) {
			const hash = await generateHash(credential.password);
			if (hash === user[0].passwordDigest) {
				login(ctx, user[0].id);
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
	logout(ctx);
	return ctx.body(null, 204);
});
