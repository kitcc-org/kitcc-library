import { userTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Context } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';

export const isLoggedIn = async (ctx: Context) => {
	const userIdCookie = getCookie(ctx, 'user_id', 'secure');
	// Cookieが存在しない場合
	if (userIdCookie === undefined) {
		return false;
	}
	const userId = Number(userIdCookie);
	// Cookieが数値でない場合
	if (isNaN(userId)) {
		return false;
	}

	const sessionToken = getCookie(ctx, 'session_token', 'secure');
	// session_tokenが存在しない場合
	if (sessionToken === undefined) {
		return false;
	}

	const db = drizzle(ctx.env.DB);
	// データベースからsession_tokenを取得する
	const user = await db
		.select({ sessionToken: userTable.sessionToken })
		.from(userTable)
		.where(eq(userTable.id, userId));

	if (0 < user.length) {
		// Cookieとデータベースの値が一致するか確認する
		return user[0].sessionToken === sessionToken;
	} else {
		// ユーザが存在しない場合
		return false;
	}
};

export const login = async (ctx: Context, userId: number) => {
	// prettier-ignore
	setCookie(
		ctx,
		'user_id',
		userId.toString(),
		{
			// HTTPS通信時のみCookieが送信される
			secure: true,
			// Secure属性が付与されていることを強要する
			prefix: 'secure',
		}
	);

	// セッショントークンを生成する
	const sessionToken = crypto.randomUUID();
	const db = drizzle(ctx.env.DB);
	// データベースにセッショントークンを保存する
	const currentUser = await db
		.update(userTable)
		.set({ sessionToken: sessionToken })
		.where(eq(userTable.id, userId))
		.returning();
	// Cookieにセッショントークンを保存する
	// prettier-ignore
	setCookie(
		ctx,
		'session_token',
		sessionToken,
		{
			secure: true,
			prefix: 'secure'
		}
	);

	return currentUser;
};

export const logout = async (ctx: Context) => {
	const userIdCookie = getCookie(ctx, 'user_id', 'secure');
	// Cookieが存在しない場合
	if (userIdCookie === undefined) {
		return;
	}
	const userId = Number(userIdCookie);
	// Cookieが数値でない場合
	if (isNaN(userId)) {
		return;
	} else {
		const db = drizzle(ctx.env.DB);
		// データベースからセッショントークンを削除する
		await db
			.update(userTable)
			.set({ sessionToken: null })
			.where(eq(userTable.id, userId));
	}

	deleteCookie(ctx, '__Secure-user_id', { secure: true });
	deleteCookie(ctx, '__Secure-session_token', { secure: true });
};
