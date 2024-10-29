import { createCookieSessionStorage } from '@remix-run/cloudflare';

interface SessionData {
	userId: string;
	sessionToken: string;
}

interface SessionFlashData {
	// ログイン
	// loginSuccess: string;
	loginError: string;
	// ログアウト
	// logoutSuccess: string;
	// logoutError: string;
	// 書籍の削除
	deleteBookSuccess: string;
	deleteBookError: string;
}

const { getSession, commitSession, destroySession } =
	createCookieSessionStorage<SessionData, SessionFlashData>({
		cookie: {
			name: '__session',
			path: '/',
			sameSite: 'lax',
			secrets: ['s3cr3t'],
			secure: true,
		},
	});

export { commitSession, destroySession, getSession };
