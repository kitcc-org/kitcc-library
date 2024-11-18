import { TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { CreateUserBody } from 'client/client.schemas';

interface UsersAddNameFormProps {
	form: UseFormReturnType<
		CreateUserBody,
		(values: CreateUserBody) => CreateUserBody
	>;
}

const UsersAddNameForm = ({ form }: UsersAddNameFormProps) => {
	return (
		<TextInput
			label="ユーザー名"
			withAsterisk
			autoComplete="username"
			key={form.key('name')}
			aria-label="ユーザー名"
			{...form.getInputProps('name')}
		/>
	);
};

export default UsersAddNameForm;
