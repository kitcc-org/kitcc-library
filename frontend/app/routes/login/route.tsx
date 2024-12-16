import { useForm } from '@mantine/form';
import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	redirect,
} from '@remix-run/cloudflare';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { login } from 'client/client';
import type { LoginBody } from 'client/client.schemas';
import { useEffect } from 'react';
import { commitSession, getSession } from '~/services/session.server';
import { errorNotification } from '~/utils/notification';
import LoginFormComponent from './components/LoginFormComponent';

interface LoaderData {
	error?: string;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));

	// ログイン済みの場合
	if (session.has('user')) {
		// マイページへリダイレクト
		return redirect('/home/me');
	}

	// 未ログインの場合
	// エラーメッセージを取得
	const data = { error: session.get('error') };

	return json<LoaderData>(data, {
		headers: {
			'Set-Cookie': await commitSession(session),
		},
	});
};

export const action = async ({ request }: ActionFunctionArgs) => {
	// 認証情報を取得する
	const formData = await request.formData();
	const email = String(formData.get('email'));
	const password = String(formData.get('password'));
	// ログインする
	const response = await login({ email: email, password: password });

	const session = await getSession(request.headers.get('Cookie'));

	// ログインに成功した場合
	if (response.status === 200) {
		session.set('user', response.data);
		session.flash('success', 'ログインに成功しました');

		return redirect('/home/me', {
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

	return redirect('/login', {
		headers: {
			'Set-Cookie': await commitSession(session),
		},
	});
};

const LoginPage = () => {
	const { error } = useLoaderData<typeof loader>();

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
				if (value.length < 8) {
					return 'パスワードは8文字以上で入力してください';
				} else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value)) {
					return null;
				} else {
					return 'パスワードにはアルファベットと数字を含めてください';
				}
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
		// 同じメッセージが連続して表示されないように
		// actionが終了したタイミングで実行
		if (fetcher.state === 'idle') {
			if (error) {
				errorNotification(error);
			}
		}
	}, [fetcher.state]);

	return <LoginFormComponent form={form} handleSubmit={handleSubmit} />;
};

export default LoginPage;
