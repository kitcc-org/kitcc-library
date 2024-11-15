import { LoaderFunctionArgs, redirect } from '@remix-run/cloudflare';
import { Outlet } from '@remix-run/react';
import { commitSession, getSession } from '~/services/session.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));

	if (!session.has('user')) {
		return redirect('/login', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	}
	return null;
};

const UsersLayout = () => {
	return <Outlet />;
};

export default UsersLayout;
