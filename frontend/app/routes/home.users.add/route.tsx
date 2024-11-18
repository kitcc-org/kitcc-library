import { useForm } from '@mantine/form';
import { useClipboard } from '@mantine/hooks';
import { useSubmit } from '@remix-run/react';
import type { CreateUserBody } from 'client/client.schemas';
import React from 'react';
import UsersAddComponent from '~/components/users-add/UsersAddComponent';
import { errorNotification, successNotification } from '~/utils/notification';
import { passwordGen } from '~/utils/password';

const UserAddPage = () => {
	const clipborad = useClipboard({ timeout: 30000 });
	const submit = useSubmit();
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
		/>
	);
};

export default UserAddPage;
