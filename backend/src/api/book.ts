import { bookTable, SelectBook } from '@/drizzle/schema';
import { zValidator } from '@hono/zod-validator';
import { and, asc, desc, eq, inArray, like } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import {
	createBookBody,
	deleteBookParams,
	deleteBooksBody,
	getBookParams,
	getBookResponse,
	getBooksQueryParams,
	getBooksResponse,
	updateBookBody,
	updateBookParams,
	updateBookResponse,
} from '../schema';
import { isLoggedIn } from '../utils/auth';

const app = new Hono<{ Bindings: Env }>();

app.get(
	'/',
	zValidator('query', getBooksQueryParams, (result, ctx) => {
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

		let order = asc(bookTable.id);
		if (query['sort']) {
			switch (query['sort']) {
				case '0': // ID昇順
					order = asc(bookTable.id);
					break;
				case '1': // ID降順
					order = desc(bookTable.id);
					break;
				case '2': // 出版日昇順
					order = asc(bookTable.publishedDate);
					break;
				case '3': // 出版日降順
					order = desc(bookTable.publishedDate);
					break;
			}
		}

		const db = drizzle(ctx.env.DB);
		// 書籍を検索する
		const hitBooks: SelectBook[] = await db
			.select()
			.from(bookTable)
			.where(
				and(
					query['title']
						? like(bookTable.title, `%${query['title']}%`)
						: undefined,
					query['author']
						? like(bookTable.authors, `%${query['author']}%`)
						: undefined,
					query['publisher']
						? like(bookTable.publisher, `%${query['publisher']}%`)
						: undefined,
					// prettier-ignore
					query['isbn']
						? eq(bookTable.isbn, query['isbn'])
						: undefined,
				),
			)
			.orderBy(order);

		let slicedBooks: SelectBook[] = [];
		// 総ページ数を計算する
		const totalPage = Math.ceil(hitBooks.length / limit);
		if (page <= totalPage) {
			// 指定されたページの書籍を取得する
			slicedBooks = hitBooks.slice((page - 1) * limit, page * limit);
		}

		const responseBody = { totalBook: hitBooks.length, books: slicedBooks };
		const result = getBooksResponse.safeParse(responseBody);
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
	zValidator('json', createBookBody, (result, ctx) => {
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

		const newBook = ctx.req.valid('json');

		const db = drizzle(ctx.env.DB);
		// データベースから同じISBNの書籍を検索する
		const sameBook = await db
			.select({
				id: bookTable.id,
				stock: bookTable.stock,
			})
			.from(bookTable)
			.where(eq(bookTable.isbn, newBook.isbn));

		let createdBook = undefined;
		if (0 < sameBook.length) {
			// すでに同じISBNの本が登録されている場合は在庫を増やす
			createdBook = await db
				.update(bookTable)
				.set({ stock: sameBook[0].stock + 1 })
				.where(eq(bookTable.id, sameBook[0].id))
				.returning();
		} else {
			//　同じISBNの本が存在しない場合は新規登録する
			createdBook = await db.insert(bookTable).values(newBook).returning();
		}

		const result = getBookResponse.safeParse(createdBook[0]);
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
	zValidator('json', deleteBooksBody, (result, ctx) => {
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

		const { bookIdList } = ctx.req.valid('json');

		const db = drizzle(ctx.env.DB);
		await db.delete(bookTable).where(inArray(bookTable.id, bookIdList));

		return ctx.body(null, 204);
	},
);

app.get(
	'/:bookId',
	zValidator('param', getBookParams, (result, ctx) => {
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
		const param = ctx.req.valid('param');
		const bookId = parseInt(param['bookId']);

		const db = drizzle(ctx.env.DB);
		const books: SelectBook[] = await db
			.select()
			.from(bookTable)
			.where(eq(bookTable.id, bookId));

		if (books.length === 0) {
			return ctx.notFound();
		}

		const result = getBookResponse.safeParse(books[0]);
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
	'/:bookId',
	zValidator('param', updateBookParams, (result, ctx) => {
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
	zValidator('json', updateBookBody, (result, ctx) => {
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

		const param = ctx.req.valid('param');
		const bookId = parseInt(param['bookId']);

		const book = ctx.req.valid('json');

		const db = drizzle(ctx.env.DB);
		let updatedBook: SelectBook[] = [];
		try {
			updatedBook = await db
				.update(bookTable)
				.set(book)
				.where(eq(bookTable.id, bookId))
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

		if (updatedBook.length === 0) {
			return ctx.notFound();
		}

		const result = updateBookResponse.safeParse(updatedBook[0]);
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
	'/:bookId',
	zValidator('param', deleteBookParams, (result, ctx) => {
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
		const bookId = parseInt(param['bookId']);

		const db = drizzle(ctx.env.DB);
		const deletedBook = await db
			.delete(bookTable)
			.where(eq(bookTable.id, bookId))
			.returning();

		if (deletedBook.length === 0) {
			return ctx.notFound();
		}

		return ctx.body(null, 204);
	},
);

export default app;
