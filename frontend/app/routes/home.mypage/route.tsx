import { LoaderFunctionArgs, redirect } from '@remix-run/cloudflare';
import { getSession } from '~/services/session.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));

	// 未ログインの場合
	if (!session.has('userId')) {
		// ログインページへリダイレクト
		return redirect('/login');
	}

	return null;
};

const MyPage = () => {
	return <div>MyPage</div>;
};

export default MyPage;
