import { bookTable, loanTable, userTable } from '@/drizzle/schema';
import { zValidator } from '@hono/zod-validator';
import camelCase from 'camelcase';
import { and, eq, Query } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import {
	getLoansQueryParams,
	getLoansResponse,
	upsertLoansBody,
	upsertLoansResponse,
} from '../schema';
import { isLoggedIn } from '../utils/auth';

const app = new Hono<{ Bindings: Env }>();

// D1に格納されている生の貸出履歴
interface SnakeLoan {
	user_id: number;
	book_id: number;
	volume: number;
	created_at?: number;
	updated_at?: number;
}

app.get(
	'/',
	zValidator('query', getLoansQueryParams, (result, ctx) => {
		if (!result.success) {
			return ctx.json(
				{
					message: 'Query Parameter Validation Error',
					error: result.error,
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
			console.error(result.error);
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

app.patch(
	'/',
	zValidator('json', upsertLoansBody, async (result, ctx) => {
		if (!result.success) {
			return ctx.json(
				{
					message: 'Request Body Validation Error',
					error: result.error,
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

		const newLoans = ctx.req.valid('json');

		const db = drizzle(ctx.env.DB);
		const batch: Query[] = [];

		for (const newLoan of newLoans) {
			const requestUser = await db
				.select()
				.from(userTable)
				.where(eq(userTable.id, newLoan.userId));

			if (requestUser.length === 0) {
				// ユーザーが存在しない場合
				return ctx.json({ userId: newLoan.userId }, 404);
			}

			// 在庫数を取得する
			const requestBoook = await db
				.select()
				.from(bookTable)
				.where(eq(bookTable.id, newLoan.bookId));

			if (requestBoook.length === 0) {
				// 書籍が存在しない場合
				return ctx.json({ bookId: newLoan.bookId }, 404);
			}

			if (requestBoook[0].stock < newLoan.volume) {
				// 貸出数が在庫数を超えている場合
				return ctx.json(newLoan, 409);
			}

			// 同じ貸出履歴を検索する
			const sameLoan = await db
				.select()
				.from(loanTable)
				.where(
					and(
						eq(loanTable.userId, newLoan.userId),
						eq(loanTable.bookId, newLoan.bookId)
					)
				);
			if (0 < sameLoan.length) {
				// 既に貸出履歴が存在する場合
				// 更新後の貸出数を計算する
				const totalVolume = sameLoan[0].volume + newLoan.volume;
				if (totalVolume < 0) {
					// 貸出数が負になる場合
					return ctx.json(newLoan, 409);
				} else if (totalVolume == 0) {
					// 貸出数が0になる場合は削除
					const deleteQuery = db
						.delete(loanTable)
						.where(
							and(
								eq(loanTable.userId, newLoan.userId),
								eq(loanTable.bookId, newLoan.bookId)
							)
						)
						.returning()
						.toSQL();
					batch.push(deleteQuery);
				} else if (0 < totalVolume) {
					// 貸出数が正になる場合は更新
					const updateQuery = db
						.update(loanTable)
						.set({ volume: totalVolume })
						.where(
							and(
								eq(loanTable.userId, newLoan.userId),
								eq(loanTable.bookId, newLoan.bookId)
							)
						)
						.returning()
						.toSQL();
					batch.push(updateQuery);
				}
			} else {
				// 貸出履歴が存在しない場合
				const createQuery = db
					.insert(loanTable)
					.values(newLoan)
					.returning()
					.toSQL();
				batch.push(createQuery);
			}

			// 貸出数を在庫数から引く
			const updateQuery = db
				.update(bookTable)
				.set({ stock: requestBoook[0].stock - newLoan.volume })
				.where(eq(bookTable.id, newLoan.bookId))
				.toSQL();
			batch.push(updateQuery);
		}

		const rawDb = ctx.env.DB;
		const batchResponse: D1Result<SnakeLoan>[] = await rawDb.batch(
			batch.map((query) => {
				return rawDb.prepare(query.sql).bind(...query.params);
			})
		);

		const upsertedLoans = batchResponse.flatMap((response) => {
			const results = response.results;
			// 貸出履歴以外の実行結果は削除する
			if (results.length === 0) {
				return [];
			}

			// プロパティ名をキャメルケースに変換する
			return Object.fromEntries(
				Object.entries(results[0]).map(([key, value]) => {
					return [camelCase(key), value];
				})
			);
		});

		const result = upsertLoansResponse.safeParse(upsertedLoans);
		if (!result.success) {
			console.error(result.error);
			return ctx.json(
				{
					message: 'Response Validation Error',
				},
				500
			);
		} else {
			return ctx.json(result.data, 200);
		}
	}
);

export default app;
