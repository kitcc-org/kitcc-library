import { bookTable, SelectBook } from '@/drizzle/schema';
import app from '@/src/index';
import { env } from 'cloudflare:test';
import { count, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { loggedInTest } from '../context/login';
import { bookFactory } from '../factories/book';

interface GetBooksResponse {
	totalPage: number;
	books: SelectBook[];
}

describe('GET /books', () => {
	const db = drizzle(env.DB);
	const books = bookFactory.buildList(5);

	beforeAll(async () => {
		await db.insert(bookTable).values(books);
	});

	afterAll(async () => {
		await db.delete(bookTable);
		bookFactory.resetSequenceNumber();
	});

	it('should return correct number of books', async () => {
		const limit = 3;

		// prettier-ignore
		const params = new URLSearchParams({ page: '1', limit: limit.toString() }).toString();
		const response = await app.request(`/books?${params}`, {}, env);

		expect(response.status).toBe(200);

		const body: GetBooksResponse = await response.json();
		expect(body.totalPage).toBe(2);
		expect(body.books).toHaveLength(limit);
	});

	it('should return correct book', async () => {
		const firstBook = { ...books[0], id: 1 };

		const params = new URLSearchParams({ title: firstBook.title }).toString();
		const response = await app.request(`/books?${params}`, {}, env);

		expect(response.status).toBe(200);

		const body: GetBooksResponse = await response.json();
		expect(body.totalPage).toBe(1);
		expect(body.books).toContainEqual(firstBook);
	});

	it('should return 400 when page is not a number', async () => {
		// pageに数字以外を指定する
		const response = await app.request('/books?page=a', {}, env);

		expect(response.status).toBe(400);
	});

	it('should return 400 when limit is not a number', async () => {
		// limitに数字以外を指定する
		const response = await app.request('/books?limit=a', {}, env);

		expect(response.status).toBe(400);
	});
});

describe('POST /books', async () => {
	const db = drizzle(env.DB);

	afterAll(async () => {
		bookFactory.resetSequenceNumber();
	});

	loggedInTest(
		'should create new book',
		async ({ currentUser, sessionToken }) => {
			const book = bookFactory.build();
			const response = await app.request(
				'/books',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify(book),
				},
				env
			);

			// ステータスコード
			expect(response.status).toBe(201);

			// レスポンスボディ
			const createdBook = await response.json();
			const { stock, ...rest } = book;
			expect(createdBook).toMatchObject(rest);

			// データベースに書籍が登録されていることを確認する
			const totalBook = await db.select({ count: count() }).from(bookTable);
			expect(totalBook[0].count).toBe(1);
		}
	);

	loggedInTest(
		'should increase stock when book is already registered',
		async ({ currentUser, sessionToken }) => {
			const book = bookFactory.build();
			// 先にデータベースに書籍を登録しておく
			await db.insert(bookTable).values(book);

			const response = await app.request(
				'/books',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					// 同じ書籍を登録する
					body: JSON.stringify(book),
				},
				env
			);

			expect(response.status).toBe(201);

			const totalBook = await db
				.select({
					count: count(),
					stock: bookTable.stock,
				})
				.from(bookTable)
				.where(eq(bookTable.isbn, book.isbn));
			// 書籍が1冊しか登録されていないことを確認する
			expect(totalBook[0].count).toBe(1);
			// 蔵書数が1冊増えていることを確認する
			expect(totalBook[0].stock).toBe(book.stock! + 1);
		}
	);

	loggedInTest(
		'should return 400 when title is missing',
		async ({ currentUser, sessionToken }) => {
			// タイトルを指定しない
			const book = bookFactory.build({ title: undefined });

			const response = await app.request(
				'/books',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify(book),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	loggedInTest(
		'should return 400 when authors is missing',
		async ({ currentUser, sessionToken }) => {
			// 著者を指定しない
			const book = bookFactory.build({ authors: undefined });

			const response = await app.request(
				'/books',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify(book),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	loggedInTest(
		'should return 400 when publisher is missing',
		async ({ currentUser, sessionToken }) => {
			// 出版社を指定しない
			const book = bookFactory.build({ publisher: undefined });

			const response = await app.request(
				'/books',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify(book),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	loggedInTest(
		'should return 400 when isbn is missing',
		async ({ currentUser, sessionToken }) => {
			// ISBNを指定しない
			const book = bookFactory.build({ isbn: undefined });

			const response = await app.request(
				'/books',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify(book),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	loggedInTest(
		'should return 400 when stock is missing',
		async ({ currentUser, sessionToken }) => {
			// 蔵書数を指定しない
			const book = bookFactory.build({ stock: undefined });

			const response = await app.request(
				'/books',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify(book),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	it('should return 401 when not logged in', async () => {
		const book = bookFactory.build();

		const response = await app.request(
			'/books',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					// Cookieを指定しない
				},
				body: JSON.stringify(book),
			},
			env
		);

		expect(response.status).toBe(401);
	});
});

describe('GET /books/search', () => {
	it('should return 400 when page is not a number', async () => {
		// pageに数字以外を指定する
		const response = await app.request('/books/search?page=a', {}, env);

		expect(response.status).toBe(400);
	});

	it('should return 400 when limit is not a number', async () => {
		// limitに数字以外を指定する
		const response = await app.request('/books/search?limit=a', {}, env);

		expect(response.status).toBe(400);
	});

	it('should return 400 when isbn is not 10|13 digits number', async () => {
		// ISBNに10 or 13桁以外の数字を指定する
		// prettier-ignore
		const response = await app.request('/books/search?isbn=123456789', {}, env);

		expect(response.status).toBe(400);
	});
});
