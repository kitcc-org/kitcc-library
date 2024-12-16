import { Container, Space } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { FaUser, FaUserEdit } from 'react-icons/fa';
import BreadCrumbsComponent from '~/components/breadcrumbs/BreadCrumbsComponent';
import FormLayout from '~/components/layouts/FormLayout';
import { UpdateUserFormBody } from '~/routes/home.me.edit/route';
import MyPageEditPasswordFieldSet from './MyPageEditPasswordFieldSet';
import MyPageEditProfileFieldSet from './MyPageEditProfileFieldSet';
import MyPageEditSubmitButton from './MyPageEditSubmitButton';
import MyPageEditTitle from './MyPageEditTitle';

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
					{ icon: <FaUser />, title: 'マイページ', href: '/home/me' },
					{
						icon: <FaUserEdit />,
						title: 'プロフィール更新',
						href: '/home/me/edit',
					},
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
