import { bookTable, SelectBook } from '@/drizzle/schema';
import { zValidator } from '@hono/zod-validator';
import { and, asc, eq, like } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import {
	createBookBody,
	deleteBookParams,
	getBookParams,
	getBookResponse,
	getBooksQueryParams,
	getBooksResponse,
	searchBooksQueryParams,
	searchBooksResponse,
	updateBookBody,
	updateBookParams,
	updateBookResponse,
} from '../schema';
import { isLoggedIn } from '../utils/auth';

const app = new Hono<{ Bindings: Env }>();

// Google Books APIsのレスポンスボディ
// 200(OK)の場合
interface GoogleBookVolume {
	totalItems: number;
	items?: [
		{
			volumeInfo: {
				title: string;
				authors?: string[];
				publisher?: string;
				publishedDate?: string;
				description?: string;
				imageLinks?: {
					thumbnail: string;
				};
				industryIdentifiers?: {
					type: string;
					identifier: string;
				}[];
			};
		},
	];
}
// 400(Bad Request)の場合
interface GoogleApiError {
	error: {
		code: number;
		message: string;
		errors: {
			message: string;
			domain: string;
			reason: string;
		}[];
	};
}

// GET /search のレスポンス
interface GoogleBook {
	title: string;
	authors: string[];
	publisher: string;
	publishedDate: string;
	description: string;
	thumbnail: string;
	isbn: string;
}

app.get(
	'/search',
	zValidator('query', searchBooksQueryParams, (result, ctx) => {
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

		delete query['page'];
		delete query['limit'];

		// 絞り込み条件を作成する
		let terms = '';
		for (const [key, value] of Object.entries(query)) {
			if (value) {
				terms += `+${key}:${value}`;
			}
		}

		// クエリパラメータを作成する
		const params = new URLSearchParams({
			q: terms,
			startIndex: String((page - 1) * limit),
			maxResults: String(limit),
			key: ctx.env.GOOGLE_BOOKS_API_KEY,
		});

		// Google Books APIsにリクエストを送信する
		// prettier-ignore
		const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${params}`);
		if (response.status !== 200) {
			const error: GoogleApiError = await response.json();
			return ctx.json(error, 400);
		}

		const volumeResult: GoogleBookVolume = await response.json();
		// ヒットした書籍を格納する配列
		const hitBooks: GoogleBook[] = [];

		// 書籍がヒットしたか確認する
		if (volumeResult.hasOwnProperty('items')) {
			// ヒットした書籍を配列に格納する
			for (const item of volumeResult.items ?? []) {
				const book = item.volumeInfo;

				// ISBNを取得する
				let isbn = undefined;
				if (book.hasOwnProperty('industryIdentifiers')) {
					// prettier-ignore
					for(const identifier of book.industryIdentifiers!) {
						if (identifier.type === 'ISBN_13') {
							isbn = identifier.identifier;
							break;
						} else if (identifier.type === 'ISBN_10') {
							isbn = identifier.identifier;
						}
					}
				}

				// 書籍を配列に追加する
				hitBooks.push({
					title: book.title,
					authors: book.authors ?? [],
					publisher: book.publisher ?? '',
					publishedDate: book.publishedDate ?? '',
					description: book.description ?? '',
					thumbnail: book.imageLinks?.thumbnail ?? '',
					isbn: isbn ?? '',
				});
			}
		}

		const responseBody = {
			totalBook: volumeResult.totalItems,
			books: hitBooks,
		};
		const result = searchBooksResponse.safeParse(responseBody);
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
			.orderBy(asc(bookTable.id));

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
	},
);

export default app;
