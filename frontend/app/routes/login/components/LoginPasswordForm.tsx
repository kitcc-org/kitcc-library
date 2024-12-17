import { PasswordInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { LoginBody } from 'client/client.schemas';

interface LoginPasswordFormProps {
	form: UseFormReturnType<LoginBody, (values: LoginBody) => LoginBody>;
}

const LoginPasswordForm = ({ form }: LoginPasswordFormProps) => {
	return (
		<PasswordInput
			label="パスワード"
			withAsterisk
			autoComplete="current-password"
			key={form.key('password')}
			aria-label="パスワード"
			{...form.getInputProps('password')}
		/>
	);
};

export default LoginPasswordForm;
