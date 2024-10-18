import { bookTable } from '@/drizzle/schema';
import app from '@/src/index';
import { env } from 'cloudflare:test';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { loggedInTest } from '../context/login';
import { bookFactory } from '../factories/book';

describe('GET /books/:bookId', () => {
	const db = drizzle(env.DB);
	const book = bookFactory.build();

	beforeAll(async () => {
		await db.insert(bookTable).values(book);
	});

	afterAll(async () => {
		await db.delete(bookTable);
		bookFactory.resetSequenceNumber();
	});

	it('should return correct book', async () => {
		const response = await app.request(`/books/1`, {}, env);
		const result = await response.json();

		expect(response.status).toBe(200);
		expect(result).toMatchObject(book);
	});

	it('should return 400 when bookId is not a number', async () => {
		const response = await app.request(`/books/id`, {}, env);

		expect(response.status).toBe(400);
	});

	it('should return 404 when book is not found', async () => {
		const response = await app.request(`/books/100`, {}, env);

		expect(response.status).toBe(404);
	});
});

describe('PATCH /books/:bookId', () => {
	const db = drizzle(env.DB);
	const books = bookFactory.buildList(2);

	beforeEach(async () => {
		await db.insert(bookTable).values(books);
	});

	afterEach(async () => {
		await db.delete(bookTable);
	});

	afterAll(() => {
		bookFactory.resetSequenceNumber();
	});

	loggedInTest('should update book', async ({ currentUser, sessionToken }) => {
		const book = {
			title: '計算機プログラムの構造と解釈',
			// prettier-ignore
			authors: [
				'Harold Abelson',
				'Gerald Jay Sussman',
				'Julie Sussman'
			],
			publisher: '翔泳社',
			isbn: '9784798135984',
			stock: 1,
		};

		const books = await db.select().from(bookTable);
		const response = await app.request(
			`/books/${books[0].id}`,
			{
				method: 'PATCH',
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

		expect(response.status).toBe(200);

		const updatedBook = await db
			.select()
			.from(bookTable)
			.where(eq(bookTable.id, books[0].id));
		expect(updatedBook[0]).toMatchObject(book);
	});

	loggedInTest(
		'should return 400 when bookId is not a number',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				// bookIdに数以外を指定する
				`/books/id`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify({ title: 'title' }),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	loggedInTest(
		'should return 400 when title is not a string',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				`/books/1`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					// タイトルに文字列以外を指定する
					body: JSON.stringify({ title: 1 }),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	loggedInTest(
		'should return 400 when authors is not an array',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				`/books/1`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					// 著者に配列以外を指定する
					body: JSON.stringify({ authors: 'author' }),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	loggedInTest(
		'should return 400 when publisher is not a string',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				`/books/1`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					// 出版社に文字列以外を指定する
					body: JSON.stringify({ publisher: 1 }),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	loggedInTest(
		'should return 400 when isbn is not a string',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				`/books/1`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					// ISBNに文字列以外を指定する
					body: JSON.stringify({ isbn: 123456789 }),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	loggedInTest(
		'should return 400 when violate ISBN unique constraint',
		async ({ currentUser, sessionToken }) => {
			const books = await db.select().from(bookTable);

			const response = await app.request(
				`/books/${books[1].id}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					// 既に登録されているISBNを指定する
					body: JSON.stringify({ isbn: books[0].isbn }),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	it('should return 401 when not logged in', async () => {
		const response = await app.request(
			`/books/1`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					// Cookieを指定しない
				},
				body: JSON.stringify({ title: '計算機プログラムの構造と解釈' }),
			},
			env
		);

		expect(response.status).toBe(401);
	});

	loggedInTest(
		'should return 404 when book is not found',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				// 存在しないbookIdを指定する
				`/books/100`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify({ title: '計算機プログラムの構造と解釈' }),
				},
				env
			);

			expect(response.status).toBe(404);
		}
	);
});

describe('DELETE /books/:bookId', () => {
	const db = drizzle(env.DB);
	const book = bookFactory.build();

	beforeEach(async () => {
		await db.insert(bookTable).values(book);
	});

	afterEach(async () => {
		await db.delete(bookTable);
	});

	afterAll(() => {
		bookFactory.resetSequenceNumber();
	});

	loggedInTest('should delete book', async ({ currentUser, sessionToken }) => {
		const books = await db.select().from(bookTable);

		const response = await app.request(
			`/books/${books[0].id}`,
			{
				method: 'DELETE',
				headers: {
					Cookie: [
						`__Secure-user_id=${currentUser.id}`,
						`__Secure-session_token=${sessionToken}`,
					].join('; '),
				},
			},
			env
		);

		expect(response.status).toBe(204);

		// データベースから削除されていることを確認する
		const deletedBook = await db
			.select()
			.from(bookTable)
			.where(eq(bookTable.id, books[0].id));
		expect(deletedBook).toHaveLength(0);
	});

	loggedInTest(
		'should return 400 when bookId is not a number',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				// bookIdに数以外を指定する
				`/books/id`,
				{
					method: 'DELETE',
					headers: {
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	it('should return 401 when not logged in', async () => {
		const response = await app.request(`/books/1`, {
			method: 'DELETE',
			// Cookieを指定しない
		});

		expect(response.status).toBe(401);
	});

	loggedInTest(
		'should return 404 when book is not found',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				// 存在しないbookIdを指定する
				`/books/100`,
				{
					method: 'DELETE',
					headers: {
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
				},
				env
			);

			expect(response.status).toBe(404);
		}
	);
});
