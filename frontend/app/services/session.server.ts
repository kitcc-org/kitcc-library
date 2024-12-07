import { createCookieSessionStorage } from '@remix-run/cloudflare';
import { User } from 'client/client.schemas';

export interface SessionData {
	user: User;
}

export interface SessionFlashData {
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
