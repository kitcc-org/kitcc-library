import { useForm } from '@mantine/form';
import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	redirect,
} from '@remix-run/cloudflare';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { login, useLogin } from 'client/client';
import type { LoginBody } from 'client/client.schemas';
import { useEffect } from 'react';
import LoginFormComponent from '~/components/login/LoginFormComponent';
import { commitSession, getSession } from '~/services/session.server';
import { errorNotifications } from '~/utils/notification';

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));

	// ログイン済みの場合
	if (session.has('userId')) {
		// マイページへリダイレクト
		return redirect('/home/mypage');
	}

	// 未ログインの場合
	const data = { error: session.get('error') };

	return json(data, {
		headers: {
			'Set-Cookie': await commitSession(session),
		},
	});
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));

	const formData = await request.formData();
	const email = String(formData.get('email'));
	const password = String(formData.get('password'));

	const response = await login({ email: email, password: password });

	// ログインに成功した場合
	if (response.status === 200) {
		session.flash('success', 'ログインに成功しました');
		session.set('userId', response.data.id.toString());
		session.set('sessionToken', response.data.sessionToken!);
		return redirect('/home/mypage', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	}

	// ログインに失敗した場合
	switch (response.status) {
		case 400:
			session.flash('error', 'メールアドレスまたはパスワードが間違っています');
			break;
		case 401:
			session.flash('error', 'メールアドレスまたはパスワードが間違っています');
			break;
		case 404:
			session.flash('error', 'ユーザーが見つかりません');
			break;
		case 500:
			session.flash('error', 'サーバーエラーが発生しました');
			break;
		default:
			session.flash('error', 'エラーが発生しました');
	}
	return redirect('/auth/login', {
		headers: {
			'Set-Cookie': await commitSession(session),
		},
	});
};

const LoginPage = () => {
	const { error } = useLoaderData<typeof loader>();

	const loginTask = useLogin();
	const fetcher = useFetcher();
	const form = useForm<LoginBody>({
		mode: 'uncontrolled',
		initialValues: {
			email: '',
			password: '',
		},
		validate: {
			email: (value) =>
				/^[\w+\-.]+@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]+$/i.test(value)
					? null
					: '有効でないメールアドレスです',
			password: (value) => {
				if (value.length < 8) return 'パスワードは8文字以上で入力してください';
				else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value)) return null;
				else return 'パスワードにはアルファベットと数字を含めてください';
			},
		},
	});

	const handleSubmit = (props: LoginBody) => {
		fetcher.submit(
			{ email: props.email, password: props.password },
			{ method: 'POST' },
		);
	};

	useEffect(() => {
		// actionが終了したタイミングで実行
		if (fetcher.state === 'idle') {
			if (error) {
				errorNotifications(error);
			}
		}
	}, [fetcher.state]);

	return (
		<LoginFormComponent
			isPending={loginTask.isPending}
			form={form}
			handleSubmit={handleSubmit}
		/>
	);
};

export default LoginPage;
