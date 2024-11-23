import { Container, Space } from '@mantine/core';
import MyPageEditTitle from './MyPageEditTitle';
import { UseFormReturnType } from '@mantine/form';
import { UpdateUserFormBody } from '~/routes/home.me.edit/route';
import MyPageEditProfileFieldSet from './MyPageEditProfileFieldSet';
import MyPageEditPasswordFieldSet from './MyPageEditPasswordFieldSet';
import FormLayout from '../layouts/FormLayout';
import MyPageEditSubmitButton from './MyPageEditSubmitButton';
import BreadCrumbsComponent from '../common/breadcrumbs/BreadCrumbsComponent';

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
			<BreadCrumbsComponent
				anchors={[
					{ title: 'マイページ', href: '/home/me' },
					{ title: 'プロフィール編集', href: '/home/me/edit' },
				]}
			/>
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
