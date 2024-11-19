import FormLayout from '../layouts/FormLayout';
import { CreateUserBody } from 'client/client.schemas';
import { UseFormReturnType } from '@mantine/form';
import UserCreateTitle from './UserCreateTitle';
import UserCreateEmailForm from './UserCreateEmailForm';
import UserCreateNameForm from './UserCreateNameForm';
import { Container } from '@mantine/core';
import UserCreatePasswordForm from './UserCreatePasswordForm';
import UserCreateSubmitButton from './UserCreateSubmitButton';
import UserCreatePasswordComponent from './UserCreatePasswordComponent';

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
