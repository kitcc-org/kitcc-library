import { SelectUser, userTable } from '@/drizzle/schema';
import { zValidator } from '@hono/zod-validator';
import { eq, like } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import {
	createUserBody,
	deleteUserParams,
	getUserParams,
	getUserResponse,
	getUsersQueryParams,
	getUsersResponse,
	updateUserBody,
	updateUserParams,
	updateUserResponse,
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
		// データベースから同じメールアドレスのユーザを検索する
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
			// 同じメールアドレスのユーザがいない場合は新規登録する
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
		const users: SelectUser[] = await db
			.select()
			.from(userTable)
			.where(eq(userTable.id, id));

		if (users.length === 0) {
			return ctx.notFound();
		}

		const result = getUserResponse.safeParse(users[0]);
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

app.put(
	'/:userId',
	zValidator('param', updateUserParams, (result, ctx) => {
		if (!result.success) {
			return ctx.json(
				{
					message: 'Path Paramter Validation Error',
				},
				400
			);
		}
	}),
	zValidator('json', updateUserBody, (result, ctx) => {
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

		const param = ctx.req.valid('param');
		const id = parseInt(param['userId']);

		const user = ctx.req.valid('json');

		const db = drizzle(ctx.env.DB);
		let updatedBook: SelectUser[] = [];
		try {
			updatedBook = await db
				.update(userTable)
				.set(user)
				.where(eq(userTable.id, id))
				.returning();
		} catch (err) {
			if (err instanceof Error) {
				return ctx.json(
					{
						message: err.message,
					},
					400
				);
			}
		}

		if (updatedBook.length === 0) {
			return ctx.notFound();
		}

		const result = updateUserResponse.safeParse(updatedBook[0]);
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

app.delete(
	'/:userId',
	zValidator('param', deleteUserParams, (result, ctx) => {
		if (!result.success) {
			return ctx.json(
				{
					message: 'Bad Request',
				},
				400
			);
		}
	}),
	async (ctx) => {
		// TODO:ログイン済みか確認する

		const param = ctx.req.valid('param');
		const id = parseInt(param['userId']);

		const db = drizzle(ctx.env.DB);
		const deletedBook = await db
			.delete(userTable)
			.where(eq(userTable.id, id))
			.returning();

		if (deletedBook.length === 0) {
			return ctx.notFound();
		}

		return ctx.body(null, 204);
	}
);

export default app;
