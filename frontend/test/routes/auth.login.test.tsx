describe('Login page', () => {
	it('should login successfully', async () => {
		// メールアドレスを入力
		// パスワードを入力
		// ログインボタンをクリック
		// ログイン成功の通知が表示される
	});

	it('should fail to pass when email is invalid', async () => {
		// メールアドレスを入力
		// ログインボタンをクリック
		// エラーメッセージが表示される
	});

	it('should fail to pass when password length is less than 8', async () => {
		// パスワードを入力
		// ログインボタンをクリック
		// エラーメッセージが表示される
	});

	it('should fail to pass when password is not alphanumeric', async () => {
		// パスワードを入力
		// ログインボタンをクリック
		// エラーメッセージが表示される
	});
});
