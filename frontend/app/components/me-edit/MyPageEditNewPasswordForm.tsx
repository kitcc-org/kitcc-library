import { PasswordInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { UpdateUserFormBody } from '~/routes/home.me.edit/route';

interface MyPageEditNewPasswordFormProps {
	form: UseFormReturnType<
		UpdateUserFormBody,
		(values: UpdateUserFormBody) => UpdateUserFormBody
	>;
}

const MyPageEditNewPasswordForm = ({
	form,
}: MyPageEditNewPasswordFormProps) => {
	return (
		<PasswordInput
			label="新しいパスワード"
			autoComplete="new-password"
			key={form.key('newPassword')}
			aria-label="新しいパスワード"
			{...form.getInputProps('newPassword')}
		/>
	);
};

export default MyPageEditNewPasswordForm;
