import { PasswordInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { UpdateUserFormBody } from '~/routes/home.me.edit/route';

interface MyPageEditCurrentPasswordFormProps {
	form: UseFormReturnType<
		UpdateUserFormBody,
		(values: UpdateUserFormBody) => UpdateUserFormBody
	>;
}

const MyPageEditCurrentPasswordForm = ({
	form,
}: MyPageEditCurrentPasswordFormProps) => {
	return (
		<PasswordInput
			label="現在のパスワード"
			autoComplete="current-password"
			key={form.key('currentPassword')}
			aria-label="現在のパスワード"
			{...form.getInputProps('currentPassword')}
		/>
	);
};

export default MyPageEditCurrentPasswordForm;
