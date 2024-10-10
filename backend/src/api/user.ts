import { SelectUser, userTable } from '@/drizzle/schema';
import { zValidator } from '@hono/zod-validator';
import { eq, like } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import {
	createUserBody,
	getUserParams,
	getUserResponse,
	getUsersQueryParams,
	getUsersResponse,
} from '../schema';
import { generateHash } from '../utils/crypto';

const app = new Hono<{ Bindings: Env }>();

app.get(
	'/',
	zValidator('query', getUsersQueryParams, (result, ctx) => {
		if (!result.success) {
			return ctx.json(
				{
					message: 'Query Parameter Validation Error',
				},
				400
			);
		}
	}),
	async (ctx) => {
		const query = ctx.req.valid('query');

		const page = parseInt(query['page'] ?? '1');
		const limit = parseInt(query['limit'] ?? '10');

		const db = drizzle(ctx.env.DB);
		const users: SelectUser[] = await db
			.select()
			.from(userTable)
			.where(
				query['name'] ? like(userTable.name, `%${query['name']}%`) : undefined
			)
			.limit(limit)
			.offset((page - 1) * limit);

		const result = getUsersResponse.safeParse(users);
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

app.post(
	'/',
	zValidator('json', createUserBody, (result, ctx) => {
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
		// TODO:ログイン済みか確認する

		const newUser = ctx.req.valid('json');

		const db = drizzle(ctx.env.DB);
		const sameUser = await db
			.select({ id: userTable.id })
			.from(userTable)
			.where(eq(userTable.email, newUser.email));

		if (0 < sameUser.length) {
			// すでに同じメールアドレスのユーザが登録されている
			return ctx.json(
				{
					message: 'Conflict',
				},
				409
			);
		} else {
			// 新規登録
			const hash = await generateHash(newUser.password);
			// prettier-ignore
			await db
        .insert(userTable)
        .values({
          name: newUser.name,
          email: newUser.email,
          passwordDigest: hash,
        });
		}

		return ctx.json(
			{
				message: 'Created',
			},
			201
		);
	}
);

app.get(
	'/:userId',
	zValidator('param', getUserParams, (result, ctx) => {
		if (!result.success) {
			return ctx.json(
				{
					message: 'Path Paramter Validation Error',
				},
				400
			);
		}
	}),
	async (ctx) => {
		const param = ctx.req.valid('param');
		const id = parseInt(param['userId']);

		const db = drizzle(ctx.env.DB);
		const books: SelectUser[] = await db
			.select()
			.from(userTable)
			.where(eq(userTable.id, id));

		if (books.length === 0) {
			return ctx.notFound();
		}

		const result = getUserResponse.safeParse(books[0]);
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

export default app;
