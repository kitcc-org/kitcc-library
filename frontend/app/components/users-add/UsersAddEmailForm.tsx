import { TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { CreateUserBody } from 'client/client.schemas';

interface UsersAddEmailFormProps {
	form: UseFormReturnType<
		CreateUserBody,
		(values: CreateUserBody) => CreateUserBody
	>;
}

const UsersAddEmailForm = ({ form }: UsersAddEmailFormProps) => {
	return (
		<TextInput
			label="メールアドレス"
			withAsterisk
			autoComplete="email"
			key={form.key('email')}
			aria-label="メールアドレス"
			{...form.getInputProps('email')}
		/>
	);
};

export default UsersAddEmailForm;
