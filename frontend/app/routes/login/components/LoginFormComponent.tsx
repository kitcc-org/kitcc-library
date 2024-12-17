import type { UseFormReturnType } from '@mantine/form';
import type { LoginBody } from 'client/client.schemas';
import FormBaseLayout from '~/components/layouts/FormBaseLayout';
import FormLayout from '~/components/layouts/FormLayout';
import LoginEmailForm from './LoginEmailForm';
import LoginFormHelpText from './LoginFormHelpText';
import LoginFormTitle from './LoginFormTitle';
import LoginPasswordForm from './LoginPasswordForm';
import LoginSubmitButton from './LoginSubmitButton';

interface LoginFormComponentProps {
	form: UseFormReturnType<LoginBody, (values: LoginBody) => LoginBody>;
	handleSubmit: (props: LoginBody) => void;
}

const LoginFormComponent = ({
	form,
	handleSubmit,
}: LoginFormComponentProps) => {
	return (
		<FormBaseLayout>
			<FormLayout<LoginBody> form={form} handleSubmit={handleSubmit}>
				<LoginFormTitle />
				<LoginEmailForm form={form} />
				<LoginPasswordForm form={form} />
				<LoginSubmitButton />
				<LoginFormHelpText />
			</FormLayout>
		</FormBaseLayout>
	);
};

export default LoginFormComponent;
