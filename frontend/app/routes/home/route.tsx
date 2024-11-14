import { AppShell, Container } from '@mantine/core';
import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	redirect,
} from '@remix-run/cloudflare';
import {
	Outlet,
	useLoaderData,
	useNavigation,
	useRevalidator,
} from '@remix-run/react';
import { getUser, logout } from 'client/client';
import type { User } from 'client/client.schemas';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import HeaderComponent from '~/components/header/HeaderComponent';
import { commitSession, getSession } from '~/services/session.server';
import { userAtom } from '~/stores/userAtom';
import { errorNotification, successNotification } from '~/utils/notification';

interface LoaderData {
	userData?: User;
	success?: string;
	error?: string;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));

	const userId = session.get('userId');
	const success = session.get('success');
	const error = session.get('error');

	if (!userId) {
		return json<LoaderData>(
			{
				userData: undefined,
				success: success,
				error: error,
			},
			{
				headers: {
					'Set-Cookie': await commitSession(session),
				},
			},
		);
	} else {
		const cookieHeader = [
			`__Secure-user_id=${session.get('userId')};`,
			`__Secure-session_token=${session.get('sessionToken')}`,
		].join('; ');

		const response = await getUser(userId, {
			headers: { Cookie: cookieHeader },
		});

		return json<LoaderData>(
			{
				userData: response.data,
				success: success,
				error: error,
			},
			{
				headers: {
					'Set-Cookie': await commitSession(session),
				},
			},
		);
	}
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
		session.flash('success', 'ログアウトに成功しました');

		return redirect('/home', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	} else {
		session.flash('error', 'ログアウトに失敗しました');

		return redirect('/home', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	}
};

const Home = () => {
	const { userData, success, error } = useLoaderData<typeof loader>();

	const [user, setUser] = useAtom(userAtom);
	const navigation = useNavigation();
	const revalidator = useRevalidator();

	useEffect(() => {
		if (navigation.state === 'idle') {
			if (!!userData) {
				// CookieにユーザIDが存在する
				if (!user) {
					// 状態変数にユーザ情報が保存されていない
					// ユーザ情報を取得するAPIを呼び出す
					setUser(userData);
				}
			} else {
				setUser(undefined);
			}
		}
	}, [userData]);

	useEffect(() => {
		if (success) {
			successNotification(success);
			revalidator.revalidate();
		}
	}, [success]);

	useEffect(() => {
		if (error) {
			errorNotification(error);
			revalidator.revalidate();
		}
	}, [error]);

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
