import {
	bookTable,
	InsertLoan,
	loanTable,
	SelectLoan,
	userTable,
} from '@/drizzle/schema';
import app from '@/src/index';
import { env } from 'cloudflare:test';
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
