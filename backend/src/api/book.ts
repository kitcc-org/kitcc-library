import { bookTable } from '@/drizzle/schema';
import { zValidator } from '@hono/zod-validator';
import { eq, InferSelectModel } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import {
	createBookBody,
	getBookParams,
	getBookResponse,
	getBooksQueryParams,
	getBooksResponse,
} from '../schema';

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

app.get(
	'/:bookId',
	zValidator('param', getBookParams, (result, ctx) => {
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
		const param = ctx.req.valid('param');
		const id = parseInt(param['bookId']);

		const db = drizzle(ctx.env.DB);
		const book: Book[] = await db.select().from(bookTable).where(eq(bookTable.id, id));

		if (book.length === 0) {
			return ctx.json(
				{
					message: 'Not Found',
				},
				404
			);
		}

		const result = getBookResponse.safeParse(book[0]);
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

export default app;
