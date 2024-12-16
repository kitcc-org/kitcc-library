import { Fieldset } from '@mantine/core';
import MyPageEditNameForm from './MyPageEditNameForm';
import { UseFormReturnType } from '@mantine/form';
import { UpdateUserFormBody } from '~/routes/home.me.edit/route';
import MyPageEditEmailForm from './MyPageEditEmailForm';

interface MyPageEditProfileFieldSetProps {
	form: UseFormReturnType<
		UpdateUserFormBody,
		(values: UpdateUserFormBody) => UpdateUserFormBody
	>;
}

const MyPageEditProfileFieldSet = ({
	form,
}: MyPageEditProfileFieldSetProps) => {
	return (
		<Fieldset>
			<MyPageEditNameForm form={form} />
			<MyPageEditEmailForm form={form} />
		</Fieldset>
	);
};

export default MyPageEditProfileFieldSet;
