import { useForm } from '@mantine/form';
import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	redirect,
} from '@remix-run/cloudflare';
import { useFetcher } from '@remix-run/react';
import { login, useLogin } from 'client/client';
import type { LoginBody } from 'client/client.schemas';
import LoginFormComponent from '~/components/login/LoginFormComponent';
import { commitSession, getSession } from '~/services/session.server';
import { errorNotifications, successNotifications } from '~/utils/notification';

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));
	if (session.has('__Secure-user_id')) return redirect('/home/mypage');
	return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));
	const formData = await request.formData();
	const loginEmail = String(formData.get('email'));
	const loginPassword = String(formData.get('password'));
	const response = await login({ email: loginEmail, password: loginPassword });
	switch (response.status) {
		case 200:
			successNotifications('ログインに成功しました');
			session.set('__Secure-user_id', response.data.id);
			session.set('__Srcure-session_token', response.data.sessionToken);
			const headers = new Headers({
				'Set-Cookie': await commitSession(session),
			});
			return redirect('/home/mypage', { headers });
		case 400:
			errorNotifications('メールアドレスまたはパスワードが間違っています');
			break;
		case 401:
			errorNotifications('メールアドレスまたはパスワードが間違っています');
			break;
		case 404:
			errorNotifications('ユーザーが見つかりません');
			break;
		case 500:
			errorNotifications('サーバーエラーが発生しました');
			break;
		default:
			errorNotifications('エラーが発生しました');
	}
	return null;
};

const LoginPage = () => {
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
			{ method: 'post' },
		);
	};

	return (
		<LoginFormComponent
			isPending={loginTask.isPending}
			form={form}
			handleSubmit={handleSubmit}
		/>
	);
};

export default LoginPage;
