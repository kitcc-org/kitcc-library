import { TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { CreateUserBody } from 'client/client.schemas';

interface UserCreateEmailFormProps {
	form: UseFormReturnType<
		CreateUserBody,
		(values: CreateUserBody) => CreateUserBody
	>;
}

const UserCreateEmailForm = ({ form }: UserCreateEmailFormProps) => {
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

export default UserCreateEmailForm;
