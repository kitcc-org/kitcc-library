import { createCookieSessionStorage } from '@remix-run/cloudflare';

const { getSession, commitSession, destroySession } =
	createCookieSessionStorage({
		cookie: {
			name: '__session',
			path: '/',
			sameSite: 'lax',
			secrets: ['s3cr3t'],
			secure: true,
		},
	});

export { getSession, commitSession, destroySession };
