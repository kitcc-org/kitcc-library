import { SelectUser, userTable } from '@/drizzle/schema';
import { zValidator } from '@hono/zod-validator';
import { and, asc, eq, inArray, like } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import {
	createUserBody,
	deleteUserParams,
	deleteUsersBody,
	getUserParams,
	getUserResponse,
	getUsersQueryParams,
	getUsersResponse,
	updateUserBody,
	updateUserParams,
	updateUserResponse,
} from '../schema';
import { isLoggedIn } from '../utils/auth';
import { generateHash } from '../utils/crypto';

const app = new Hono<{ Bindings: Env }>();

app.get(
	'/',
	zValidator('query', getUsersQueryParams, (result, ctx) => {
		if (!result.success) {
			return ctx.json(
				{
					message: 'Query Parameter Validation Error',
					error: result.error,
				},
				400,
			);
		}
	}),
	async (ctx) => {
		const query = ctx.req.valid('query');

		const page = parseInt(query['page'] ?? '1');
		const limit = parseInt(query['limit'] ?? '10');

		const db = drizzle(ctx.env.DB);
		// ユーザを検索する
		const hitUsers: SelectUser[] = await db
			.select()
			.from(userTable)
			.where(
				and(
					query['name']
						? like(userTable.name, `%${query['name']}%`)
						: undefined,
					// prettier-ignore
					query['email']
						? eq(userTable.email, query['email'])
						: undefined,
				),
			)
			.orderBy(asc(userTable.id));

		let slicedUsers: SelectUser[] = [];
		// 総ページ数を計算する
		const totalPage = Math.ceil(hitUsers.length / limit);
		if (page <= totalPage) {
			// 指定されたページのユーザを取得する
			slicedUsers = hitUsers.slice((page - 1) * limit, page * limit);
		}

		const responseBody = { totalUser: hitUsers.length, users: slicedUsers };
		const result = getUsersResponse.safeParse(responseBody);
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

app.post(
	'/',
	zValidator('json', createUserBody, (result, ctx) => {
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
		const authed = await isLoggedIn(ctx);
		if (!authed) {
			return ctx.json(
				{
					message: 'Unauthorized',
				},
				401,
			);
		}

		const newUser = ctx.req.valid('json');

		const db = drizzle(ctx.env.DB);
		// データベースから同じメールアドレスのユーザを検索する
		const sameUser = await db
			.select({ id: userTable.id })
			.from(userTable)
			.where(eq(userTable.email, newUser.email));

		let createdUser = undefined;
		if (0 < sameUser.length) {
			// すでに同じメールアドレスのユーザが登録されている
			return ctx.json(
				{
					message: 'Conflict',
				},
				409,
			);
		} else {
			// 同じメールアドレスのユーザがいない場合は新規登録する
			const hash = await generateHash(newUser.password);
			// prettier-ignore
			createdUser = await db
        .insert(userTable)
        .values({
          name: newUser.name,
          email: newUser.email,
          passwordDigest: hash,
        })
				.returning();
		}

		const result = getUserResponse.safeParse(createdUser[0]);
		if (!result.success) {
			console.error(result.error);
			return ctx.json(
				{
					message: 'Response Validation Error',
				},
				500,
			);
		} else {
			return ctx.json(result.data, 201);
		}
	},
);

app.delete(
	'/',
	zValidator('json', deleteUsersBody, (result, ctx) => {
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
		const authed = await isLoggedIn(ctx);
		if (!authed) {
			return ctx.json(
				{
					message: 'Unauthorized',
				},
				401,
			);
		}

		const { userIdList } = ctx.req.valid('json');

		const db = drizzle(ctx.env.DB);
		await db.delete(userTable).where(inArray(userTable.id, userIdList));

		return ctx.body(null, 204);
	},
);

app.get(
	'/:userId',
	zValidator('param', getUserParams, (result, ctx) => {
		if (!result.success) {
			return ctx.json(
				{
					message: 'Path Paramter Validation Error',
					error: result.error,
				},
				400,
			);
		}
	}),
	async (ctx) => {
		const authed = await isLoggedIn(ctx);
		if (!authed) {
			return ctx.json(
				{
					message: 'Unauthorized',
				},
				401,
			);
		}

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

app.patch(
	'/:userId',
	zValidator('param', updateUserParams, (result, ctx) => {
		if (!result.success) {
			return ctx.json(
				{
					message: 'Path Paramter Validation Error',
					error: result.error,
				},
				400,
			);
		}
	}),
	zValidator('json', updateUserBody, (result, ctx) => {
		if (!result.success) {
			return ctx.json(
				{
					message: 'Request Body Validation Error',
				},
				400,
			);
		}
	}),
	async (ctx) => {
		const authed = await isLoggedIn(ctx);
		if (!authed) {
			return ctx.json(
				{
					message: 'Unauthorized',
				},
				401,
			);
		}

		const param = ctx.req.valid('param');
		const id = parseInt(param['userId']);

		const userIdCookie = getCookie(ctx, 'user_id', 'secure');
		const userId = Number(userIdCookie);

		if (id !== userId) {
			// ログインユーザと更新対象のユーザが異なる
			return ctx.json(
				{
					message: 'Unauthorized',
				},
				401,
			);
		}

		const newUser = ctx.req.valid('json');

		const db = drizzle(ctx.env.DB);

		if (newUser.newPassword) {
			// 新しいパスワードが指定されている
			if (!newUser.currentPassword) {
				// 現在のパスワードが指定されていない
				return ctx.json(
					{
						message: 'Current password is required to update password',
					},
					400,
				);
			}

			const user = await db
				.select()
				.from(userTable)
				.where(eq(userTable.id, id));

			if (user.length === 0) {
				return ctx.notFound();
			}

			const digest = await generateHash(newUser.currentPassword);
			if (digest != user[0].passwordDigest) {
				return ctx.json(
					{
						message: 'Current password is incorrect',
					},
					400,
				);
			}
		}

		let updatedUser: SelectUser[] = [];
		try {
			updatedUser = await db
				.update(userTable)
				.set({
					name: newUser.name,
					email: newUser.email,
					passwordDigest: newUser.newPassword
						? await generateHash(newUser.newPassword)
						: undefined,
				})
				.where(eq(userTable.id, id))
				.returning();
		} catch (err) {
			if (err instanceof Error) {
				return ctx.json(
					{
						message: err.message,
					},
					400,
				);
			}
		}

		if (updatedUser.length === 0) {
			return ctx.notFound();
		}

		const result = updateUserResponse.safeParse(updatedUser[0]);
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

app.delete(
	'/:userId',
	zValidator('param', deleteUserParams, (result, ctx) => {
		if (!result.success) {
			return ctx.json(
				{
					message: 'Path Paramter Validation Error',
					error: result.error,
				},
				400,
			);
		}
	}),
	async (ctx) => {
		const authed = await isLoggedIn(ctx);
		if (!authed) {
			return ctx.json(
				{
					message: 'Unauthorized',
				},
				401,
			);
		}

		const param = ctx.req.valid('param');
		const id = parseInt(param['userId']);

		const db = drizzle(ctx.env.DB);
		const deletedUser = await db
			.delete(userTable)
			.where(eq(userTable.id, id))
			.returning();

		if (deletedUser.length === 0) {
			return ctx.notFound();
		}

		return ctx.body(null, 204);
	},
);

export default app;
