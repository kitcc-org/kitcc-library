import { useForm } from '@mantine/form';
import { useClipboard } from '@mantine/hooks';
import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
} from '@remix-run/cloudflare';
import { redirect, useSubmit } from '@remix-run/react';
import { createUser } from 'client/client';
import type { CreateUserBody } from 'client/client.schemas';
import { useEffect, useState } from 'react';
import { commitSession, getSession } from '~/services/session.server';
import { ActionResponse } from '~/types/response';
import { errorNotification, successNotification } from '~/utils/notification';
import { generatePassword } from '~/utils/password';
import { makeCookieHeader } from '~/utils/session';
import UserCreateComponent from './components/UserCreateComponent';

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));
	const userData = session.get('user');

	// 未ログインの場合
	if (!userData) {
		// ログインページへリダイレクト
		return redirect('/login', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	}

	return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));
	const userData = session.get('user');

	if (!userData) {
		session.flash('error', 'ログインしてください');
		return redirect('/login', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	}

	const cookieHeader = makeCookieHeader(session);

	const requestBody = await request.json<{ createUserBody: CreateUserBody }>();
	const createUserBody = requestBody.createUserBody;
	const response = await createUser(createUserBody, {
		headers: { Cookie: cookieHeader },
	});

	switch (response.status) {
		case 201:
			session.flash('success', 'ユーザーを追加しました');
			return redirect('/home/users', {
				headers: {
					'Set-Cookie': await commitSession(session),
				},
			});

		case 401:
			session.flash('error', 'ログインしてください');
			return redirect('/login', {
				headers: {
					'Set-Cookie': await commitSession(session),
				},
			});

		case 409:
			session.flash('error', '同じメールアドレスのユーザーが既に存在します');
			return json<ActionResponse>(
				{ method: 'DELETE', status: response.status },
				{
					headers: {
						'Set-Cookie': await commitSession(session),
					},
				},
			);

		default:
			session.flash('error', 'ユーザーの追加に失敗しました');
			return json<ActionResponse>(
				{ method: 'POST', status: response.status },
				{
					headers: {
						'Set-Cookie': await commitSession(session),
					},
				},
			);
	}
};

const UserCreatePage = () => {
	const clipborad = useClipboard({ timeout: 30000 });
	const submit = useSubmit();
	const [counts, setCounts] = useState(0);

	useEffect(() => {
		const countDown = setInterval(() => {
			if (counts == 0) {
				clearInterval(countDown);
				clipborad.reset();
			} else {
				setCounts(counts - 1);
			}
		}, 1000);
		// コンポーネントがアンマウントした時、タイマーをクリアする
		return () => clearInterval(countDown);
	}, [counts]);

	const form = useForm<CreateUserBody>({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			email: '',
			password: '',
		},
		validate: {
			name: (value) => {
				if (value.length < 1) {
					return 'ユーザー名は必須です';
				}
			},
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

	const handlePasswordGenButtonClick = () => {
		const password = generatePassword();
		clipborad.copy(password);
		// コールバック関数の実行時間を考慮して、29秒に設定
		setCounts(29);
		successNotification('パスワードをコピーしました');
		form.setValues({ password: password });
	};

	const handleSubmit = (props: CreateUserBody) => {
		// Clipboradにパスワードが保存されてから30秒以内かどうか
		if (clipborad.copied) {
			// パスワードを生成してから30秒以内の場合
			submit(JSON.stringify({ createUserBody: props }), {
				action: '/home/users/create',
				method: 'POST',
				encType: 'application/json',
			});
		} else {
			// パスワードを生成していない or 生成してから30秒経過している場合
			errorNotification('パスワードを生成してください');
		}
	};

	return (
		<UserCreateComponent
			form={form}
			handleSubmit={handleSubmit}
			handlePasswordGenButtonClick={handlePasswordGenButtonClick}
			copied={clipborad.copied}
			counts={counts}
		/>
	);
};

export default UserCreatePage;
