import { Outlet, useLoaderData } from '@remix-run/react';
import { AppShell, Container } from '@mantine/core';
import HeaderComponent from '~/components/header/HeaderComponent';
import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	redirect,
} from '@remix-run/cloudflare';
import { destroySession, getSession } from '~/services/session.server';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '~/stores/userAtom';
import { getUser, logout } from 'client/client';
import { errorNotifications, successNotifications } from '~/utils/notification';
import { O } from 'node_modules/@faker-js/faker/dist/airline-C5Qwd7_q';

interface LoaderProps {
	userId: string | undefined;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));
	if (!session.has('__Secure-user_id')) {
		return json<LoaderProps>({ userId: undefined });
	} else {
		return json<LoaderProps>({
			userId: session.get('__Secure-user_id'),
		});
	}
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));
	const response = await logout(session.get('__Secure-user_id'));
	if (response.status === 204) {
		const headers = new Headers({
			'Set-Cookie': await destroySession(session),
		});
		successNotifications('ログアウトしました');
		return redirect('/home', { headers });
	}
	errorNotifications('ログアウトに失敗しました');
	return null;
};

const Home = () => {
	const { userId } = useLoaderData<typeof loader>();

	const [user, setUser] = useAtom(userAtom);
	useEffect(() => {
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
	}, []);
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
