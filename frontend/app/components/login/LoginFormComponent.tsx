import FormLayout from '../layouts/FormLayout'
import LoginEmailForm from './LoginEmailForm'
import LoginPasswordForm from './LoginPasswordForm'
import LoginSubmitButton from './LoginSubmitButton'
import type { UseFormReturnType } from '@mantine/form'
import type { LoginBody } from 'orval/kITCCLibraryAPI.schemas'
import LoginFormTitle from './LoginFormTitle'
import LoginFormHelpText from './LoginFormHelpText'

interface LoginFormComponentProps {
  isPending: boolean;
  form: UseFormReturnType<LoginBody, (values: LoginBody) => LoginBody>
  handleSubmit: (props: LoginBody) => void
}

const LoginFormComponent = ({
  isPending,
  form,
  handleSubmit
}: LoginFormComponentProps) => {
  return (
    <FormLayout<LoginBody>
      form={form}
      handleSubmit={handleSubmit}
    >
        <LoginFormTitle />
        <LoginEmailForm form={form}/>
        <LoginPasswordForm form={form}/>
        <LoginSubmitButton isPending={isPending}/>
        <LoginFormHelpText />
    </FormLayout>
  )
}

export default LoginFormComponent