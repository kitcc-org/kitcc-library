import { zValidator } from '@hono/zod-validator';
import { getPrismaClient } from '@utils/prisma-client';
import { Hono } from 'hono';
import { getBooksQueryParams, getBooksResponse } from '../schema';

type Bindings = {
	DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', zValidator('query', getBooksQueryParams), async (ctx) => {
	// TODO:書籍の絞り込み
	// PR#16がマージされたら実装する
	let { page, limit } = ctx.req.valid('query');

	page = page ?? 1;
	limit = limit ?? 10;

	const prisma = getPrismaClient(ctx.env.DATABASE_URL);

	const books = await prisma.book.findMany({
		skip: (page - 1) * limit,
		take: limit,
		// TODO:ここに絞り込み条件を追加する
	});

	const result = getBooksResponse.safeParse(books);
	if (!result.success) {
		return ctx.json(
			{
				code: 500,
				message: 'Internal Server Error',
			},
			500
		);
	}

	return ctx.json(result.data);
});

export default app;
