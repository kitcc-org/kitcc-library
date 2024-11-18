import { Form } from '@remix-run/react';
import React from 'react';
import FormLayout from '../layouts/FormLayout';
import { CreateUserBody } from 'client/client.schemas';
import { UseFormReturnType } from '@mantine/form';
import UsersAddTitle from './UsersAddTitle';
import UsersAddEmailForm from './UsersAddEmailForm';
import UsersAddNameForm from './UsersAddNameForm';
import { Center, Container, VisuallyHidden } from '@mantine/core';
import UsersAddPasswordForm from './UsersAddPasswordForm';
import UsersAddSubmitButton from './UsersAddSubmitButton';
import PasswordGenerateButton from './PasswordGenerateButton';
import FormBaseLayout from '../layouts/FormBaseLayout';

interface UsersAddComponentProps {
	form: UseFormReturnType<
		CreateUserBody,
		(values: CreateUserBody) => CreateUserBody
	>;
	handleSubmit: (props: CreateUserBody) => void;
	handlePasswordGenButtonClick: () => void;
	copied: boolean;
}

const UsersAddComponent = ({
	form,
	handleSubmit,
	handlePasswordGenButtonClick,
	copied,
}: UsersAddComponentProps) => {
	return (
		<Container size="sm">
			<FormLayout<CreateUserBody> form={form} handleSubmit={handleSubmit}>
				<UsersAddTitle />
				<UsersAddNameForm form={form} />
				<UsersAddEmailForm form={form} />
				<UsersAddPasswordForm form={form} />
				<PasswordGenerateButton
					handlePasswordGenButtonClick={handlePasswordGenButtonClick}
				/>
				<UsersAddSubmitButton copied={copied} />
			</FormLayout>
		</Container>
	);
};

export default UsersAddComponent;
