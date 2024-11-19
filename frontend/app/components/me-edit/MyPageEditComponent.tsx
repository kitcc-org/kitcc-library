import { Container, Space } from '@mantine/core';
import MyPageEditTitle from './MyPageEditTitle';
import { UseFormReturnType } from '@mantine/form';
import { UpdateUserFormBody } from '~/routes/home.me.edit/route';
import MyPageEditProfileFieldSet from './MyPageEditProfileFieldSet';
import MyPageEditPasswordFieldSet from './MyPageEditPasswordFieldSet';
import FormLayout from '../layouts/FormLayout';
import MyPageEditSubmitButton from './MyPageEditSubmitButton';

interface MyPageEditComponentProps {
	form: UseFormReturnType<
		UpdateUserFormBody,
		(values: UpdateUserFormBody) => UpdateUserFormBody
	>;
	handleSubmit: (props: UpdateUserFormBody) => void;
}

const MyPageEditComponent = ({
	form,
	handleSubmit,
}: MyPageEditComponentProps) => {
	return (
		<Container size="sm">
			<FormLayout<UpdateUserFormBody> form={form} handleSubmit={handleSubmit}>
				<MyPageEditTitle />
				<Space h="xs" />
				<MyPageEditProfileFieldSet form={form} />
				<Space h="xs" />
				<MyPageEditPasswordFieldSet form={form} />
				<Space h="xs" />
				<MyPageEditSubmitButton />
			</FormLayout>
		</Container>
	);
};

export default MyPageEditComponent;
