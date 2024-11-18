import { TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { CreateUserBody } from 'client/client.schemas';

interface UsersAddPasswordFormProps {
	form: UseFormReturnType<
		CreateUserBody,
		(values: CreateUserBody) => CreateUserBody
	>;
}

const UsersAddPasswordForm = ({ form }: UsersAddPasswordFormProps) => {
	return (
		<TextInput
			disabled
			label="パスワード"
			withAsterisk
			autoComplete="current-password"
			key={form.key('password')}
			aria-label="パスワード"
			{...form.getInputProps('password')}
		/>
	);
};

export default UsersAddPasswordForm;
