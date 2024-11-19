import { useForm } from '@mantine/form';
import { useSubmit } from '@remix-run/react';
import type { UpdateUserBody } from 'client/client.schemas';
import MyPageEditComponent from '~/components/me-edit/MyPageEditComponent';
import { errorNotification } from '~/utils/notification';

export interface UpdateUserFormBody extends UpdateUserBody {
	newPasswordAgain?: string;
}
const MyPageEdit = () => {
	const submit = useSubmit();
	const form = useForm<UpdateUserFormBody>({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			email: '',
			currentPassword: '',
			newPassword: '',
			newPasswordAgain: '',
		},
		validate: {
			name: (value) => {
				if (!value || value.length < 1) {
					return 'ユーザー名は必須です';
				}
			},
			email: (value) =>
				value && /^[\w+\-.]+@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]+$/i.test(value)
					? null
					: '有効でないメールアドレスです',
			currentPassword: (value, values) => {
				// パスワードを更新しようとしているかどうか
				if (
					// パスワード関連のフォームを操作している
					value &&
					values.currentPassword &&
					values.newPassword &&
					// パスワード関連のフォームの中身が全て空でない
					!(
						values.currentPassword !== '' &&
						value !== '' &&
						values.newPassword !== ''
					)
				) {
					if (value.length < 8)
						return 'パスワードは8文字以上で入力してください';
					else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value))
						return null;
					else return 'パスワードにはアルファベットと数字を含めてください';
				} else return null;
			},
			newPassword: (value, values) => {
				// パスワードを更新しようとしているかどうか
				if (
					// パスワード関連のフォームを操作している
					value &&
					values.currentPassword &&
					values.newPassword &&
					// パスワード関連のフォームの中身が全て空でない
					!(
						values.currentPassword !== '' &&
						value !== '' &&
						values.newPassword !== ''
					)
				) {
					if (value !== values.currentPassword) {
						return 'パスワードが更新されていません';
					} else if (value.length < 8)
						return 'パスワードは8文字以上で入力してください';
					else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value))
						return null;
					else return 'パスワードにはアルファベットと数字を含めてください';
				} else return null;
			},
			newPasswordAgain: (value, values) => {
				// パスワードを更新しようとしているかどうか
				if (
					// パスワード関連のフォームを操作している
					value &&
					values.currentPassword &&
					values.newPassword &&
					// パスワード関連のフォームの中身が全て空でない
					!(
						values.currentPassword !== '' &&
						value !== '' &&
						values.newPassword !== ''
					)
				) {
					if (value !== values.newPassword) {
						return '新しいパスワードが一致しません';
					} else if (value.length < 8)
						return 'パスワードは8文字以上で入力してください';
					else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value))
						return null;
					else return 'パスワードにはアルファベットと数字を含めてください';
				} else return null;
			},
		},
	});

	const handleSubmit = (props: UpdateUserFormBody) => {
		if (props.newPassword === props.newPasswordAgain) {
			errorNotification('新しいパスワードが一致しません');
		} else {
			submit(JSON.stringify({ updateUserBody: props as UpdateUserBody }));
		}
	};

	return <MyPageEditComponent form={form} handleSubmit={handleSubmit} />;
};

export default MyPageEdit;
