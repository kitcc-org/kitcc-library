import { createCookieSessionStorage } from '@remix-run/cloudflare';

interface SessionData {
	userId: string;
	sessionToken: string;
}

interface SessionFlashData {
	success?: string;
	error?: string;
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
