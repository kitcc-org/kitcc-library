import { PasswordInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { UpdateUserFormBody } from '~/routes/home.me.edit/route';

interface MyPageEditNewPasswordAgainFormProps {
	form: UseFormReturnType<
		UpdateUserFormBody,
		(values: UpdateUserFormBody) => UpdateUserFormBody
	>;
}

const MyPageEditNewPasswordAgainForm = ({
	form,
}: MyPageEditNewPasswordAgainFormProps) => {
	return (
		<PasswordInput
			label="新しいパスワード（再確認）"
			autoComplete="new-password"
			key={form.key('newPasswordAgain')}
			aria-label="新しいパスワード（再確認）"
			{...form.getInputProps('newPasswordAgain')}
		/>
	);
};

export default MyPageEditNewPasswordAgainForm;
