import { Fieldset } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { UpdateUserFormBody } from '~/routes/home.me.edit/route';
import MyPageEditCurrentPasswordForm from './MyPageEditCurrentPasswordForm';
import MyPageEditNewPasswordForm from './MyPageEditNewPasswordForm';
import MyPageEditNewPasswordAgainForm from './MyPageEditNewPasswordAgainForm';

interface MyPageEditPasswordFieldSetProps {
	form: UseFormReturnType<
		UpdateUserFormBody,
		(values: UpdateUserFormBody) => UpdateUserFormBody
	>;
}

const MyPageEditPasswordFieldSet = ({
	form,
}: MyPageEditPasswordFieldSetProps) => {
	return (
		<Fieldset>
			<MyPageEditCurrentPasswordForm form={form} />
			<MyPageEditNewPasswordForm form={form} />
			<MyPageEditNewPasswordAgainForm form={form} />
		</Fieldset>
	);
};

export default MyPageEditPasswordFieldSet;
