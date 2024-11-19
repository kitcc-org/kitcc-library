import FormLayout from '../layouts/FormLayout';
import { CreateUserBody } from 'client/client.schemas';
import { UseFormReturnType } from '@mantine/form';
import UsersAddTitle from './UsersAddTitle';
import UsersAddEmailForm from './UsersAddEmailForm';
import UsersAddNameForm from './UsersAddNameForm';
import { Container } from '@mantine/core';
import UsersAddPasswordForm from './UsersAddPasswordForm';
import UsersAddSubmitButton from './UsersAddSubmitButton';
import UserAddPasswordComponent from './UserAddPasswordComponent';

interface UsersAddComponentProps {
	form: UseFormReturnType<
		CreateUserBody,
		(values: CreateUserBody) => CreateUserBody
	>;
	handleSubmit: (props: CreateUserBody) => void;
	handlePasswordGenButtonClick: () => void;
	copied: boolean;
	counts: number;
}

const UsersAddComponent = ({
	form,
	handleSubmit,
	handlePasswordGenButtonClick,
	copied,
	counts,
}: UsersAddComponentProps) => {
	return (
		<Container size="sm">
			<FormLayout<CreateUserBody> form={form} handleSubmit={handleSubmit}>
				<UsersAddTitle />
				<UsersAddNameForm form={form} />
				<UsersAddEmailForm form={form} />
				<UsersAddPasswordForm form={form} copied={copied} />
				<UserAddPasswordComponent
					handlePasswordGenButtonClick={handlePasswordGenButtonClick}
					copied={copied}
					counts={counts}
				/>
				<UsersAddSubmitButton copied={copied} />
			</FormLayout>
		</Container>
	);
};

export default UsersAddComponent;
