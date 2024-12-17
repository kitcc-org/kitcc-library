import { TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { UpdateUserFormBody } from '~/routes/home.me.edit/route';

interface MyPageEditEmailFormProps {
	form: UseFormReturnType<
		UpdateUserFormBody,
		(values: UpdateUserFormBody) => UpdateUserFormBody
	>;
}

const MyPageEditEmailForm = ({ form }: MyPageEditEmailFormProps) => {
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

export default MyPageEditEmailForm;
