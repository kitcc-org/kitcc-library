import { loanTable } from '@/drizzle/schema';
import { zValidator } from '@hono/zod-validator';
import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { getLoansQueryParams, getLoansResponse } from '../schema';
import { isLoggedIn } from '../utils/auth';

const app = new Hono<{ Bindings: Env }>();

app.get(
	'/',
	zValidator('query', getLoansQueryParams, (result, ctx) => {
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
		const authed = await isLoggedIn(ctx);
		if (!authed) {
			return ctx.json(
				{
					message: 'Unauthorized',
				},
				401
			);
		}

		const query = ctx.req.valid('query');

		const page = parseInt(query['page'] ?? '1');
		const limit = parseInt(query['limit'] ?? '10');

		const db = drizzle(ctx.env.DB);

		const loans = await db
			.select()
			.from(loanTable)
			.where(
				and(
					query['userId']
						? eq(loanTable.userId, parseInt(query['userId']))
						: undefined,
					query['bookId']
						? eq(loanTable.bookId, parseInt(query['bookId']))
						: undefined
				)
			)
			.limit(limit)
			.offset((page - 1) * limit);

		const result = getLoansResponse.safeParse(loans);
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
