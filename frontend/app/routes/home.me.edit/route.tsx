import { useForm } from '@mantine/form';
import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	redirect,
} from '@remix-run/cloudflare';
import { useLoaderData, useSubmit } from '@remix-run/react';
import { updateUser } from 'client/client';
import type { UpdateUserBody, User } from 'client/client.schemas';
import MyPageEditComponent from '~/components/me-edit/MyPageEditComponent';
import { commitSession, getSession } from '~/services/session.server';
import { ActionResponse } from '~/types/response';
import { errorNotification } from '~/utils/notification';

export interface UpdateUserFormBody extends UpdateUserBody {
	newPasswordAgain?: string;
}

interface LoaderData {
	userData: User;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));
	const userData = session.get('user');
	if (!userData) {
		return redirect('/login', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	}

	return json<LoaderData>({
		userData: userData,
	});
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

	const cookieHeader = [
		`__Secure-user_id=${userData.id};`,
		`__Secure-session_token=${userData.sessionToken}`,
	].join('; ');

	const requestBody = await request.json<{ updateUserBody: UpdateUserBody }>();
	const updateUserBody = requestBody.updateUserBody;

	const response = await updateUser(userData.id.toString(), updateUserBody, {
		headers: { Cookie: cookieHeader },
	});

	switch (response.status) {
		case 200:
			session.set('user', response.data);
			session.flash('success', 'ユーザー情報を更新しました');
			return redirect('/home/me', {
				headers: {
					'Set-Cookie': await commitSession(session),
				},
			});
		case 400:
			session.flash('error', 'メールアドレスまたはパスワードが間違っています');
			return json<ActionResponse>(
				{
					method: 'PATCH',
					status: response.status,
				},
				{
					headers: {
						'Set-Cookie': await commitSession(session),
					},
				},
			);
		case 401:
			session.flash('error', 'ログインしてください');
			return redirect('/login', {
				headers: {
					'Set-Cookie': await commitSession(session),
				},
			});
		case 404:
			session.flash('error', 'ユーザーが見つかりませんでした');
			return json<ActionResponse>(
				{
					method: 'PATCH',
					status: response.status,
				},
				{
					headers: {
						'Set-Cookie': await commitSession(session),
					},
				},
			);
		case 500:
			session.flash('error', 'サーバーエラーが発生しました');
			return json<ActionResponse>(
				{
					method: 'PATCH',
					status: response.status,
				},
				{
					headers: {
						'Set-Cookie': await commitSession(session),
					},
				},
			);
		default:
			session.flash('error', 'ユーザー情報を更新できませんでした');
			return json<ActionResponse>(
				{
					method: 'PATCH',
					status: response.status,
				},
				{
					headers: {
						'Set-Cookie': await commitSession(session),
					},
				},
			);
	}
};

const MyPageEdit = () => {
	const submit = useSubmit();
	const { userData } = useLoaderData<LoaderData>();
	const form = useForm<UpdateUserFormBody>({
		mode: 'uncontrolled',
		initialValues: {
			name: userData.name,
			email: userData.email,
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
				// パスワードを更新しようとしている
				if (value || values.newPassword || values.newPasswordAgain) {
					// パスワードフォームが全て空文字列
					if (
						value === '' &&
						values.newPassword === '' &&
						values.newPasswordAgain === ''
					) {
						return null;
					} else {
						if (value) {
							if (value.length < 8) {
								return 'パスワードは8文字以上で入力してください';
							} else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value)) {
								return null;
							} else {
								return 'パスワードにはアルファベットと数字を含めてください';
							}
						} else {
							return '現在のパスワードを入力してください';
						}
					}
					// パスワードフォームを触っていない
				} else {
					return null;
				}
			},
			newPassword: (value, values) => {
				// パスワードを更新しようとしている
				if (value || values.currentPassword || values.newPasswordAgain) {
					// パスワードフォームが全て空文字列
					if (
						value === '' &&
						values.currentPassword === '' &&
						values.newPasswordAgain === ''
					) {
						return null;
					} else {
						if (value) {
							if (value.length < 8) {
								return 'パスワードは8文字以上で入力してください';
							} else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value)) {
								if (values.currentPassword) {
									if (value === values.currentPassword) {
										return 'パスワードが更新されていません';
									} else {
										return null;
									}
								} else {
									return null;
								}
							} else {
								return 'パスワードにはアルファベットと数字を含めてください';
							}
						} else {
							return '新しいパスワードを入力してください';
						}
					}
					// パスワードフォームを触っていない
				} else {
					return null;
				}
			},
			newPasswordAgain: (value, values) => {
				// パスワードを更新しようとしている
				if (value || values.currentPassword || values.newPassword) {
					// パスワードフォームが全て空文字列
					if (
						value === '' &&
						values.currentPassword === '' &&
						values.newPassword === ''
					) {
						return null;
					} else {
						if (value) {
							if (value.length < 8) {
								return 'パスワードは8文字以上で入力してください';
							} else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value)) {
								if (values.newPassword) {
									if (value !== values.newPassword) {
										return '新しいパスワードが一致していません';
									} else {
										return null;
									}
								} else {
									return null;
								}
							} else {
								return 'パスワードにはアルファベットと数字を含めてください';
							}
						} else {
							return '新しいパスワードを入力してください';
						}
					}
					// パスワードフォームを触っていない
				} else {
					return null;
				}
			},
		},
	});

	const handleSubmit = (props: UpdateUserFormBody) => {
		const { name, email, currentPassword, newPassword, newPasswordAgain } =
			props;
		const isPasswordFormTouched =
			currentPassword || newPassword || newPasswordAgain;
		const isPasswordEmpty =
			currentPassword === '' && newPassword === '' && newPasswordAgain === '';
		if (!isPasswordFormTouched || isPasswordEmpty) {
			submit(
				JSON.stringify({
					updateUserBody: {
						name: name,
						email: email,
						currentPassword: undefined,
						newPassword: undefined,
					} as UpdateUserBody,
				}),
				{
					action: '/home/me/edit',
					method: 'PATCH',
					encType: 'application/json',
				},
			);
		} else {
			if (props.newPassword !== props.newPasswordAgain) {
				errorNotification('新しいパスワードが一致していません');
			} else {
				submit(JSON.stringify({ updateUserBody: props as UpdateUserBody }), {
					action: '/home/me/edit',
					method: 'PATCH',
					encType: 'application/json',
				});
			}
		}
	};

	return <MyPageEditComponent form={form} handleSubmit={handleSubmit} />;
};

export default MyPageEdit;
