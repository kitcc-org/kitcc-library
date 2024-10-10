import { SelectUser, userTable } from '@/drizzle/schema';
import { zValidator } from '@hono/zod-validator';
import { like } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { getUsersQueryParams, getUsersResponse } from '../schema';

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

export default app;
