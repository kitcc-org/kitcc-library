import { TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { UpdateUserFormBody } from '~/routes/home.me.edit/route';

interface MyPageEditNameFormProps {
	form: UseFormReturnType<
		UpdateUserFormBody,
		(values: UpdateUserFormBody) => UpdateUserFormBody
	>;
}

const MyPageEditNameForm = ({ form }: MyPageEditNameFormProps) => {
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

export default MyPageEditNameForm;
