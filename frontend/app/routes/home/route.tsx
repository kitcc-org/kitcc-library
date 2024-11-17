import { AppShell, Container, LoadingOverlay } from '@mantine/core';
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
import { logout } from 'client/client';
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

	const userData = session.get('user');
	const success = session.get('success');
	const error = session.get('error');

	if (!userData) {
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
		return json<LoaderData>(
			{
				userData: userData,
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
	const userId = session.get('user');

	const response = await logout({
		headers: {
			Cookie: `__Secure-user_id=${userId};`,
		},
	});

	if (response.status === 204) {
		session.unset('user');
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
			if (userData) {
				// Cookieにユーザ情報が保存されている
				if (!user) {
					// 状態変数にユーザ情報を保存する
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
					<LoadingOverlay
						visible={navigation.state === 'loading'}
						overlayProps={{ radius: 'sm', blur: 1 }}
					/>
					<Outlet />
				</AppShell.Main>
			</Container>
		</AppShell>
	);
};

export default Home;
