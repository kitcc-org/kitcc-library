import { useForm } from '@mantine/form';
import { useClipboard } from '@mantine/hooks';
import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { redirect, useSubmit } from '@remix-run/react';
import type { CreateUserBody } from 'client/client.schemas';
import { useEffect, useState } from 'react';
import UsersAddComponent from '~/components/users-add/UsersAddComponent';
import { commitSession, getSession } from '~/services/session.server';
import { errorNotification, successNotification } from '~/utils/notification';
import { passwordGen } from '~/utils/password';

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

const UserAddPage = () => {
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
					return '名前は必須です';
				}
			},
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

	const handlePasswordGenButtonClick = () => {
		const password = passwordGen();
		clipborad.copy(password);
		// カウントダウンを正常に動かすために、29秒に設定
		setCounts(29);
		successNotification('パスワードをコピーしました');
		form.setValues({ password: password });
	};

	const handleSubmit = (props: CreateUserBody) => {
		// Clipboradにパスワードが保存されてから30秒以内かどうか
		if (clipborad.copied) {
			// パスワードを生成してから30秒以内の場合
			submit(props, { method: 'POST' });
		} else {
			// パスワードを生成していない or 生成してから30秒経過している場合
			errorNotification('パスワードを生成してください');
		}
	};

	return (
		<UsersAddComponent
			form={form}
			handleSubmit={handleSubmit}
			handlePasswordGenButtonClick={handlePasswordGenButtonClick}
			copied={clipborad.copied}
			counts={counts}
		/>
	);
};

export default UserAddPage;
