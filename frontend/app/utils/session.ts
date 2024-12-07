import { Session } from '@remix-run/cloudflare';
import { SessionData, SessionFlashData } from '~/services/session.server';

export const makeCookieHeader = (
	session: Session<SessionData, SessionFlashData>,
) => {
	return [
		`__Secure-user_id=${session.get('user')?.id}`,
		`__Secure-session_token=${session.get('user')?.sessionToken}`,
	].join('; ');
};
