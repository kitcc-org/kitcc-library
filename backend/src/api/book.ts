import { bookTable } from '@/drizzle/schema';
import { zValidator } from '@hono/zod-validator';
import { InferSelectModel } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { createBookBody, getBooksQueryParams, getBooksResponse } from '../schema';

type Book = InferSelectModel<typeof bookTable>;

const app = new Hono<{ Bindings: Env }>();

app.get(
	'/',
	zValidator('query', getBooksQueryParams, (result, ctx) => {
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
		const query = ctx.req.valid('query');

		const page = parseInt(query['page'] ?? '1');
		const limit = parseInt(query['limit'] ?? '10');

		const db = drizzle(ctx.env.DB);
		const books: Book[] = await db
			.select()
			.from(bookTable)
			// TODO:ここに絞り込み条件を追加する
			// .where()
			.limit(limit)
			.offset((page - 1) * limit);

		const result = getBooksResponse.safeParse(books);
		if (!result.success) {
			return ctx.json(
				{
					message: 'Internal Server Error',
				},
				500
			);
		}

		return ctx.json(result.data);
	}
);

app.post(
	'/',
	zValidator('json', createBookBody, (result, ctx) => {
		if (!result.success) {
			console.log(result.error);
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

		const book = ctx.req.valid('json');

		const db = drizzle(ctx.env.DB);
		await db.insert(bookTable).values(book);

		return ctx.json(
			{
				message: 'Created',
			},
			201
		);
	}
);

export default app;
