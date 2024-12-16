import { TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { CreateUserBody } from 'client/client.schemas';

interface UserCreateNameFormProps {
	form: UseFormReturnType<
		CreateUserBody,
		(values: CreateUserBody) => CreateUserBody
	>;
}

const UserCreateNameForm = ({ form }: UserCreateNameFormProps) => {
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

export default UserCreateNameForm;
