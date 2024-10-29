import { AppShell, Container } from '@mantine/core';
import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	redirect,
} from '@remix-run/cloudflare';
import { Outlet, useLoaderData, useNavigation } from '@remix-run/react';
import { getUser, logout } from 'client/client';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import HeaderComponent from '~/components/header/HeaderComponent';
import { commitSession, getSession } from '~/services/session.server';
import { userAtom } from '~/stores/userAtom';
import { errorNotification, successNotification } from '~/utils/notification';

interface LoaderData {
	userId?: string;
	success?: string;
	error?: string;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));

	const userId = session.get('userId');
	const success = session.get('logoutSuccess');
	const error = session.get('logoutError');

	return json<LoaderData>(
		{
			userId: userId,
			success: success,
			error: success ? undefined : error,
		},
		{
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		},
	);
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));
	const userId = session.get('userId');

	const response = await logout({
		headers: {
			Cookie: `__Secure-user_id=${userId};`,
		},
	});

	if (response.status === 204) {
		session.unset('userId');
		session.unset('sessionToken');
		session.flash('logoutSuccess', 'ログアウトに成功しました');
		return redirect('/home', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	} else {
		session.flash('logoutError', 'ログアウトに失敗しました');
		return redirect('/home', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	}
};

const Home = () => {
	const { userId, success, error } = useLoaderData<typeof loader>();

	const [user, setUser] = useAtom(userAtom);
	const navigation = useNavigation();

	useEffect(() => {
		if (navigation.state === 'idle') {
			if (userId) {
				// CookieにユーザIDが存在する
				if (!user) {
					// 状態変数にユーザ情報が保存されていない
					// ユーザ情報を取得するAPIを呼び出す
					getUser(userId).then((response) => {
						if (response.status === 200) {
							setUser(response.data);
						}
					});
				}
			} else {
				setUser(undefined);
			}
			if (success) {
				successNotification(success);
			} else if (error) {
				errorNotification(error);
			}
		}
	}, [navigation.state]);

	return (
		<AppShell header={{ height: 70 }} padding={{ default: 'md', sm: 'sm' }}>
			<HeaderComponent />
			<Container size="xl">
				<AppShell.Main>
					<Outlet />
				</AppShell.Main>
			</Container>
		</AppShell>
	);
};

export default Home;
