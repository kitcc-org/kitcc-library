import {
	bookTable,
	InsertLoan,
	loanTable,
	SelectLoan,
	userTable,
} from '@/drizzle/schema';
import app from '@/src/index';
import { env } from 'cloudflare:test';
import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { loggedInTest } from '../context/login';
import { bookFactory } from '../factories/book';
import { userFactory } from '../factories/user';

describe('GET /loans', () => {
	const db = drizzle(env.DB);

	const users = userFactory.buildList(3);
	const books = bookFactory.buildList(3, { stock: 3 });
	let loans: InsertLoan[] = [];

	beforeAll(async () => {
		await db.insert(userTable).values(users);
		await db.insert(bookTable).values(books);

		users.forEach((user, userId) => {
			books.forEach((book, bookId) => {
				if (userId !== bookId) {
					loans.push({
						userId: userId + 1,
						bookId: bookId + 1,
						volume: 1,
					});
				}
			});
		});

		await db.insert(loanTable).values(loans);
	});

	afterAll(async () => {
		await db.delete(userTable);
		await db.delete(bookTable);

		userFactory.resetSequenceNumber();
		bookFactory.resetSequenceNumber();
	});

	loggedInTest(
		'should return correct loan',
		async ({ currentUser, sessionToken }) => {
			const userId = 1;
			const bookId = 1;

			const params = new URLSearchParams({
				userId: userId.toString(),
				bookId: bookId.toString(),
			}).toString();
			const response = await app.request(
				`/loans?${params}`,
				{
					headers: {
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
				},
				env
			);

			expect(response.status).toBe(200);

			const loans: SelectLoan[] = await response.json();
			for (const loan of loans) {
				expect(loan.userId).toBe(userId);
				expect(loan.bookId).toBe(bookId);
				expect(loan.volume).toBe(1);
			}
		}
	);

	loggedInTest(
		'should return correct number of loans',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				'/loans',
				{
					headers: {
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
				},
				env
			);

			expect(response.status).toBe(200);

			const loans: SelectLoan[] = await response.json();
			const totalLoans = users.length * (books.length - 1);
			expect(loans).toHaveLength(totalLoans);
		}
	);

	loggedInTest(
		'should return 400 when userId is not a number',
		async ({ currentUser, sessionToken }) => {
			const params = new URLSearchParams({
				userId: 'userId',
				bookId: '1',
			}).toString();
			const response = await app.request(
				`/loans?${params}`,
				{
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

	loggedInTest(
		'should return 400 when bookId is not a number',
		async ({ currentUser, sessionToken }) => {
			const params = new URLSearchParams({
				userId: '1',
				bookId: 'bookId',
			}).toString();
			const response = await app.request(
				`/loans?${params}`,
				{
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

	loggedInTest(
		'should return 400 when page is not a number',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				'/loans?page=a',
				{
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

	loggedInTest(
		'should return 400 when limit is not a number',
		async ({ currentUser, sessionToken }) => {
			const response = await app.request(
				'/loans?limit=a',
				{
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
		const response = await app.request('/loans', {}, env);

		expect(response.status).toBe(401);
	});
});

describe('PATCH /loans', () => {
	const db = drizzle(env.DB);

	const users = userFactory.buildList(2);
	const books = bookFactory.buildList(2, { stock: 3 });

	beforeAll(async () => {
		await db.insert(userTable).values(users);
		await db.insert(bookTable).values(books);
		await db.insert(loanTable).values([
			{
				userId: 1,
				bookId: 1,
				volume: 1,
			},
		]);
	});

	afterAll(async () => {
		await db.delete(userTable);
		await db.delete(bookTable);
		await db.delete(loanTable);

		userFactory.resetSequenceNumber();
		bookFactory.resetSequenceNumber();
	});

	loggedInTest(
		'should create new loan',
		async ({ currentUser, sessionToken }) => {
			const newLoan = {
				userId: currentUser.id,
				bookId: 1,
				volume: 1,
			};

			const response = await app.request(
				'/loans',
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify([newLoan]),
				},
				env
			);

			// ステータスコード
			expect(response.status).toBe(200);

			// レスポンスボディ
			const createdLoans: SelectLoan[] = await response.json();
			expect(createdLoans).toHaveLength(1);
			expect(createdLoans[0].userId).toBe(newLoan.userId);
			expect(createdLoans[0].bookId).toBe(newLoan.bookId);
			expect(createdLoans[0].volume).toBe(newLoan.volume);

			// 貸出履歴が作成されているか確認する
			const createdLoan = await db
				.select()
				.from(loanTable)
				.where(
					and(
						eq(loanTable.userId, newLoan.userId!),
						eq(loanTable.bookId, newLoan.bookId)
					)
				);
			expect(createdLoan[0].volume).toBe(newLoan.volume);

			// 書籍の在庫数が減っているか確認する
			const updatedBook = await db
				.select()
				.from(bookTable)
				.where(eq(bookTable.id, newLoan.bookId));
			expect(updatedBook[0].stock).toBe(books[0].stock! - 1);
		}
	);

	loggedInTest('should update loan', async ({ currentUser, sessionToken }) => {
		const newLoan = {
			userId: 1,
			bookId: 1,
			volume: 1,
		};

		const response = await app.request(
			'/loans',
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Cookie: [
						`__Secure-user_id=${currentUser.id}`,
						`__Secure-session_token=${sessionToken}`,
					].join('; '),
				},
				body: JSON.stringify([newLoan]),
			},
			env
		);

		// ステータスコード
		expect(response.status).toBe(200);

		// レスポンスボディ
		const createdLoans: SelectLoan[] = await response.json();
		expect(createdLoans[0].userId).toBe(newLoan.userId);
		expect(createdLoans[0].bookId).toBe(newLoan.bookId);
		expect(createdLoans[0].volume).toBe(newLoan.volume + 1);

		// 貸出履歴が更新されているか確認する
		const updatedLoan = await db
			.select()
			.from(loanTable)
			.where(
				and(
					eq(loanTable.userId, newLoan.userId),
					eq(loanTable.bookId, newLoan.bookId)
				)
			);
		expect(updatedLoan[0].volume).toBe(newLoan.volume + 1);

		// 書籍の在庫数が減っているか確認する
		const updatedBook = await db
			.select()
			.from(bookTable)
			.where(eq(bookTable.id, newLoan.bookId));
		expect(updatedBook[0].stock).toBe(books[0].stock! - 1);
	});

	loggedInTest(
		'should return 400 when userId is missing',
		async ({ currentUser, sessionToken }) => {
			const newLoan = {
				// userIdを指定しない
				bookId: 1,
				volume: 1,
			};

			const response = await app.request(
				'/loans',
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify([newLoan]),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	loggedInTest(
		'should return 400 when userId is not a number',
		async ({ currentUser, sessionToken }) => {
			const newLoan = {
				// userIdに数以外を指定する
				userId: 'userId',
				bookId: 1,
				volume: 1,
			};

			const response = await app.request(
				'/loans',
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify([newLoan]),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	loggedInTest(
		'should return 404 when user does not exist',
		async ({ currentUser, sessionToken }) => {
			const newLoan = {
				// 存在しないユーザを指定する
				userId: 100,
				bookId: 1,
				volume: 1,
			};

			const response = await app.request(
				'/loans',
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify([newLoan]),
				},
				env
			);

			expect(response.status).toBe(404);

			const body: { userId: number } = await response.json();
			expect(body.userId).toBe(100);
		}
	);

	loggedInTest(
		'should return 400 when bookId is missing',
		async ({ currentUser, sessionToken }) => {
			const newLoan = {
				userId: 1,
				// bookIdを指定しない
				volume: 1,
			};

			const response = await app.request(
				'/loans',
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify([newLoan]),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	loggedInTest(
		'should return 400 when bookId is not a number',
		async ({ currentUser, sessionToken }) => {
			const newLoan = {
				userId: 1,
				// bookIdに数以外を指定する
				bookId: 'bookId',
				volume: 1,
			};

			const response = await app.request(
				'/loans',
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify([newLoan]),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	loggedInTest(
		'should return 404 when book does not exist',
		async ({ currentUser, sessionToken }) => {
			const newLoan = {
				userId: 1,
				// 存在しない書籍を指定する
				bookId: 100,
				volume: 1,
			};

			const response = await app.request(
				'/loans',
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify([newLoan]),
				},
				env
			);

			expect(response.status).toBe(404);

			const body: { bookId: number } = await response.json();
			expect(body.bookId).toBe(100);
		}
	);

	loggedInTest(
		'should return 400 when volume is missing',
		async ({ currentUser, sessionToken }) => {
			const newLoan = {
				userId: 1,
				bookId: 1,
				// volumeを指定しない
			};

			const response = await app.request(
				'/loans',
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify([newLoan]),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	loggedInTest(
		'should return 400 when volume is not a number',
		async ({ currentUser, sessionToken }) => {
			const newLoan = {
				userId: 1,
				bookId: 1,
				// volumeに数以外を指定する
				volume: 'volume',
			};

			const response = await app.request(
				'/loans',
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify([newLoan]),
				},
				env
			);

			expect(response.status).toBe(400);
		}
	);

	it('should return 401 when not logged in', async () => {
		const newLoan = {
			userId: 1,
			bookId: 1,
			volume: 1,
		};

		const response = await app.request(
			'/loans',
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					// Cookieを指定しない
				},
				body: JSON.stringify([newLoan]),
			},
			env
		);

		expect(response.status).toBe(401);
	});

	loggedInTest(
		'should return 400 when volume is lagger than stock',
		async ({ currentUser, sessionToken }) => {
			const newLoan = {
				userId: 1,
				bookId: 1,
				// 在庫数より多い冊数を指定する
				volume: 100,
			};

			const response = await app.request(
				'/loans',
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify([newLoan]),
				},
				env
			);

			expect(response.status).toBe(409);

			const body: SelectLoan = await response.json();
			expect(body.userId).toBe(newLoan.userId);
			expect(body.bookId).toBe(newLoan.bookId);
			expect(body.volume).toBe(newLoan.volume);
		}
	);

	loggedInTest(
		'should return 400 when total volume is negative',
		async ({ currentUser, sessionToken }) => {
			const newLoan = {
				userId: 1,
				bookId: 1,
				// 貸出数よりも多い冊数を指定する
				volume: -100,
			};

			const response = await app.request(
				'/loans',
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Cookie: [
							`__Secure-user_id=${currentUser.id}`,
							`__Secure-session_token=${sessionToken}`,
						].join('; '),
					},
					body: JSON.stringify([newLoan]),
				},
				env
			);

			expect(response.status).toBe(409);

			const body: SelectLoan = await response.json();
			expect(body.userId).toBe(newLoan.userId);
			expect(body.bookId).toBe(newLoan.bookId);
			expect(body.volume).toBe(newLoan.volume);
		}
	);
});
