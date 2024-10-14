import { userTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Context } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';

export const isLoggedIn = async (ctx: Context) => {
	const userId = getCookie(ctx, 'user_id', 'secure');
	if (userId === undefined) {
		return false;
	}

	const sessionToken = getCookie(ctx, 'session_token', 'secure');
	if (sessionToken === undefined) {
		return false;
	}

	const db = drizzle(ctx.env.DB);
	const user = await db
		.select({ sessionToken: userTable.sessionToken })
		.from(userTable)
		.where(eq(userTable.id, parseInt(userId)));

	if (0 < user.length) {
		return user[0].sessionToken === sessionToken;
	} else {
		return false;
	}
};

export const login = async (ctx: Context, userId: number) => {
	// prettier-ignore
	setCookie(
		ctx,
		'user_id',
		userId.toString(), {
			secure: true,
			prefix: 'secure',
		}
	);

	const sessionToken = crypto.randomUUID();
	const db = drizzle(ctx.env.DB);
	await db
		.update(userTable)
		.set({ sessionToken: sessionToken })
		.where(eq(userTable.id, userId));
	// prettier-ignore
	setCookie(ctx, 'session_token', sessionToken, { secure: true, prefix: 'secure' });
};

export const logout = async (ctx: Context) => {
	const cookie = getCookie(ctx, 'user_id', 'secure');
	if (cookie === undefined) {
		return;
	}
	const userId = Number(cookie);
	if (isNaN(userId)) {
		return;
	}

	const db = drizzle(ctx.env.DB);
	await db
		.update(userTable)
		.set({ sessionToken: null })
		.where(eq(userTable.id, userId));

	deleteCookie(ctx, 'user_id', { secure: true });
	deleteCookie(ctx, 'session_token', { secure: true });
};
