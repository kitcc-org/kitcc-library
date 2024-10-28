import { json, LoaderFunctionArgs, redirect } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { commitSession, getSession } from '~/services/session.server';
import { successNotifications } from '~/utils/notification';

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));

	// 未ログインの場合
	if (!session.has('userId')) {
		// ログインページへリダイレクト
		return redirect('/auth/login');
	}

	// ログイン成功時のメッセージを取得
	const data = { success: session.get('loginSuccess') };

	return json(data, {
		headers: {
			'Set-Cookie': await commitSession(session),
		},
	});
};

const MyPage = () => {
	const { success } = useLoaderData<typeof loader>();

	useEffect(() => {
		if (success) {
			successNotifications(success);
		}
	}, []);

	return <div>MyPage</div>;
};

export default MyPage;
