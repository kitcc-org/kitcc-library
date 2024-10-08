import { bookTable, SelectBook } from '@/drizzle/schema';
import { zValidator } from '@hono/zod-validator';
import { and, eq, like } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import {
	createBookBody,
	deleteBookParams,
	getBookParams,
	getBookResponse,
	getBooksQueryParams,
	getBooksResponse,
	updateBookBody,
	updateBookParams,
	updateBookResponse,
} from '../schema';

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
		const books: SelectBook[] = await db
			.select()
			.from(bookTable)
			.where(
				and(
					query['title']
						? like(bookTable.title, `%${query['title']}%`)
						: undefined,
					query['author']
						? like(bookTable.author, `%${query['author']}%`)
						: undefined,
					query['publisher']
						? like(bookTable.publisher, `%${query['publisher']}%`)
						: undefined,
					// prettier-ignore
					query['isbn']
						? eq(bookTable.isbn, `%${query['isbn']}%`)
						: undefined
				)
			)
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
		} else {
			return ctx.json(result.data);
		}
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

		const newBook = ctx.req.valid('json');

		const db = drizzle(ctx.env.DB);
		const sameBook = await db
			.select({
				id: bookTable.id,
				stock: bookTable.stock,
			})
			.from(bookTable)
			.where(eq(bookTable.isbn, newBook.isbn));

		if (0 < sameBook.length) {
			// すでに同じISBNの本が登録されている
			await db
				.update(bookTable)
				.set({ stock: sameBook[0].stock + 1 })
				.where(eq(bookTable.id, sameBook[0].id));
		} else {
			// 新規登録
			await db.insert(bookTable).values(newBook);
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
		const books: SelectBook[] = await db
			.select()
			.from(bookTable)
			.where(eq(bookTable.id, id));

		if (books.length === 0) {
			return ctx.notFound();
		}

		const result = getBookResponse.safeParse(books[0]);
		if (!result.success) {
			return ctx.json(
				{
					message: 'Internal Server Error',
				},
				500
			);
		} else {
			return ctx.json(result.data);
		}
	}
);

app.put(
	'/:bookId',
	zValidator('param', updateBookParams, (result, ctx) => {
		if (!result.success) {
			return ctx.json(
				{
					message: 'Bad Request',
				},
				400
			);
		}
	}),
	zValidator('json', updateBookBody, (result, ctx) => {
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
		const id = parseInt(param['bookId']);

		const book = ctx.req.valid('json');

		const db = drizzle(ctx.env.DB);
		let updatedBook: SelectBook[] = [];
		try {
			updatedBook = await db
				.update(bookTable)
				.set(book)
				.where(eq(bookTable.id, id))
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

		const result = updateBookResponse.safeParse(updatedBook[0]);
		if (!result.success) {
			return ctx.json(
				{
					message: 'Internal Server Error',
				},
				500
			);
		} else {
			return ctx.json(result.data);
		}
	}
);

app.delete(
	'/:bookId',
	zValidator('param', deleteBookParams, (result, ctx) => {
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
		const id = parseInt(param['bookId']);

		const db = drizzle(ctx.env.DB);
		const deletedBook = await db
			.delete(bookTable)
			.where(eq(bookTable.id, id))
			.returning();

		if (deletedBook.length === 0) {
			return ctx.notFound();
		}

		return ctx.body(null, 204);
	}
);

export default app;
