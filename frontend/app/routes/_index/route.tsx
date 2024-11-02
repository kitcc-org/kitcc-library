import { redirect, type MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => {
	return [
		{ title: 'KITCC Library' },
		{
			name: 'KITCCが所有する書籍を管理するWebアプリ',
			content: 'Welcome to KITCC Library!',
		},
	];
};

export async function loader() {
	return redirect('/home');
}
