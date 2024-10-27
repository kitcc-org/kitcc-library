import { screen } from '@testing-library/react';
import { renderWithWrapper } from 'test/helpers/wrapper';
import LoginPage from '~/routes/auth.login';

describe('Login page', () => {
	it('should login successfully', async () => {
		const { user } = renderWithWrapper(<LoginPage />);

		// メールアドレスを入力
		const emailForm = screen.getByTestId('email-input');
		await user.type(emailForm, 'user@example.com');
		expect(emailForm).toHaveValue('user@example.com');

		// パスワードを入力
		const passwordForm = screen.getByTestId('password-input');
		await user.type(passwordForm, 'passw0rd');
		expect(passwordForm).toHaveValue('passw0rd');

		// ログインボタンをクリック
		const submitButton = screen.getByRole('button', { name: 'ログイン' });
		await user.click(submitButton);

		// ログイン成功の通知が表示される
		const banner = await screen.findByText('ログインに成功しました');
		expect(banner).toBeInTheDocument();
	});

	it('should fail to pass when email is invalid', async () => {
		const { user } = renderWithWrapper(<LoginPage />);

		// メールアドレスを入力
		const emailForm = screen.getByTestId('email-input');
		await user.type(emailForm, 'user@invalid');

		// ログインボタンをクリック
		const submitButton = screen.getByRole('button', { name: 'ログイン' });
		await user.click(submitButton);

		// エラーメッセージが表示される
		const message = await screen.findByText('有効でないメールアドレスです');
		expect(message).toBeInTheDocument();
	});

	test('should fail to pass when password length is less than 8', async () => {
		const { user } = renderWithWrapper(<LoginPage />);

		// パスワードを入力
		const passwordForm = screen.getByTestId('password-input');
		await user.type(passwordForm, 'pass');

		// ログインボタンをクリック
		const submitButton = screen.getByRole('button', { name: 'ログイン' });
		await user.click(submitButton);

		// エラーメッセージが表示される
		// prettier-ignore
		const message = await screen.findByText("パスワードは8文字以上で入力してください");
		expect(message).toBeInTheDocument();
	});

	test('should fail to pass when password is not alphanumeric', async () => {
		const { user } = renderWithWrapper(<LoginPage />);

		// パスワードを入力
		const passwordForm = screen.getByTestId('password-input');
		await user.type(passwordForm, 'password');

		// ログインボタンをクリック
		const submitButton = screen.getByRole('button', { name: 'ログイン' });
		await user.click(submitButton);

		// エラーメッセージが表示される
		// prettier-ignore
		const message = await screen.findByText("パスワードにはアルファベットと数字を含めてください");
		expect(message).toBeInTheDocument();
	});
});
