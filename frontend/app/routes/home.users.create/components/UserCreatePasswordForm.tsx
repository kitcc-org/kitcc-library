import { TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { CreateUserBody } from 'client/client.schemas';
import PasswordCopyButton from './PasswordCopyButton';

interface UserCreatePasswordFormProps {
	form: UseFormReturnType<
		CreateUserBody,
		(values: CreateUserBody) => CreateUserBody
	>;
	copied: boolean;
}

const UserCreatePasswordForm = ({
	form,
	copied,
}: UserCreatePasswordFormProps) => {
	return (
		<TextInput
			disabled
			label="パスワード"
			withAsterisk
			autoComplete="current-password"
			key={form.key('password')}
			aria-label="パスワード"
			rightSection={<PasswordCopyButton form={form} generated={copied} />}
			{...form.getInputProps('password')}
		/>
	);
};

export default UserCreatePasswordForm;
