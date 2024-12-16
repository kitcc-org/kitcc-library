import { Container } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { CreateUserBody } from 'client/client.schemas';
import { FaUsers } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa6';
import BreadCrumbsComponent from '~/components/common/breadcrumbs/BreadCrumbsComponent';
import FormLayout from '~/components/layouts/FormLayout';
import UserCreateEmailForm from './UserCreateEmailForm';
import UserCreateNameForm from './UserCreateNameForm';
import UserCreatePasswordComponent from './UserCreatePasswordComponent';
import UserCreatePasswordForm from './UserCreatePasswordForm';
import UserCreateSubmitButton from './UserCreateSubmitButton';
import UserCreateTitle from './UserCreateTitle';

interface UserCreateComponentProps {
	form: UseFormReturnType<
		CreateUserBody,
		(values: CreateUserBody) => CreateUserBody
	>;
	handleSubmit: (props: CreateUserBody) => void;
	handlePasswordGenButtonClick: () => void;
	copied: boolean;
	counts: number;
}

const UserCreateComponent = ({
	form,
	handleSubmit,
	handlePasswordGenButtonClick,
	copied,
	counts,
}: UserCreateComponentProps) => {
	return (
		<Container size="sm">
			<FormLayout<CreateUserBody> form={form} handleSubmit={handleSubmit}>
				<BreadCrumbsComponent
					anchors={[
						{ icon: <FaUsers />, title: 'ユーザー一覧', href: '/home/users' },
						{
							icon: <FaUserPlus />,
							title: 'ユーザー作成',
							href: '/home/users/create',
						},
					]}
				/>
				<UserCreateTitle />
				<UserCreateNameForm form={form} />
				<UserCreateEmailForm form={form} />
				<UserCreatePasswordForm form={form} copied={copied} />
				<UserCreatePasswordComponent
					handlePasswordGenButtonClick={handlePasswordGenButtonClick}
					copied={copied}
					counts={counts}
				/>
				<UserCreateSubmitButton copied={copied} />
			</FormLayout>
		</Container>
	);
};

export default UserCreateComponent;
