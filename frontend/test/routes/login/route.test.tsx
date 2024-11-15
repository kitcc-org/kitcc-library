import type * as remixruncloudflare from '@remix-run/cloudflare';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/cloudflare';
import { createRemixStub } from '@remix-run/testing';
import { screen } from '@testing-library/react';
import LoginPage, { action, loader } from '~/routes/login/route';
import { customRender } from '../../helpers/wrapper';
import { redirect } from '../../mocks/@remix-run/cloudflare';

vi.mock('@remix-run/cloudflare', async (importOriginal) => {
	const actual = await importOriginal<typeof remixruncloudflare>();
	return {
		...actual,
		redirect: (url: string, init?: number | ResponseInit) => {
			return redirect(url, init);
		},
	};
});

const LoginPageStub = createRemixStub([
	{
		path: '/login',
		Component: LoginPage,
		async loader({ request }) {
			return await loader({ request } as LoaderFunctionArgs);
		},
		async action({ request }) {
			return await action({ request } as ActionFunctionArgs);
		},
	},
]);

describe('Login page', () => {
	it('should login successfully', async () => {
		const { user } = customRender(
			<LoginPageStub initialEntries={['/login']} />,
		);

		// メールアドレスを入力
		const emailForm = await screen.findByLabelText('メールアドレス');
		await user.type(emailForm, 'user@example.com');
		expect(emailForm).toHaveValue('user@example.com');

		// パスワードを入力
		const passwordForm = await screen.findByLabelText('パスワード');
		await user.type(passwordForm, 'passw0rd');
		expect(passwordForm).toHaveValue('passw0rd');

		// ログインボタンをクリック
		// prettier-ignore
		const submitButton = await screen.findByRole('button', { name: 'ログイン' });
		await user.click(submitButton);

		// マイページへリダイレクトされる
		// prettier-ignore
		expect(redirect).toHaveBeenCalledWith(
			'/home/mypage',
			{
				headers: {
					'Set-Cookie': expect.any(String),
				},
			}
		);
	});

	it('should fail to pass when email is invalid', async () => {
		const { user } = customRender(
			<LoginPageStub initialEntries={['/login']} />,
		);

		// メールアドレスを入力
		const emailForm = await screen.findByLabelText('メールアドレス');
		await user.type(emailForm, 'user@invalid');

		// ログインボタンをクリック
		// prettier-ignore
		const submitButton = await screen.findByRole('button', { name: 'ログイン' });
		await user.click(submitButton);

		// エラーメッセージが表示される
		const message = await screen.findByText('有効でないメールアドレスです');
		expect(message).toBeInTheDocument();
	});

	it('should fail to pass when password length is less than 8', async () => {
		const { user } = customRender(
			<LoginPageStub initialEntries={['/login']} />,
		);

		// パスワードを入力
		const passwordForm = await screen.findByLabelText('パスワード');
		await user.type(passwordForm, 'hoge');

		// ログインボタンをクリック
		// prettier-ignore
		const submitButton = await screen.findByRole('button', { name: 'ログイン' });
		await user.click(submitButton);

		// エラーメッセージが表示される
		// prettier-ignore
		const message = await screen.findByText('パスワードは8文字以上で入力してください');
		expect(message).toBeInTheDocument();
	});

	it('should fail to pass when password is not alphanumeric', async () => {
		const { user } = customRender(
			<LoginPageStub initialEntries={['/login']} />,
		);

		// パスワードを入力
		const passwordForm = await screen.findByLabelText('パスワード');
		await user.type(passwordForm, 'password');

		// ログインボタンをクリック
		// prettier-ignore
		const submitButton = await screen.findByRole('button', { name: 'ログイン' });
		await user.click(submitButton);

		// エラーメッセージが表示される
		// prettier-ignore
		const message = await screen.findByText('パスワードにはアルファベットと数字を含めてください');
		expect(message).toBeInTheDocument();
	});
});
