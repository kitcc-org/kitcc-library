import type { UseFormReturnType } from '@mantine/form'
import type { LoginBody } from 'orval/client.schemas'
import { TextInput } from '@mantine/core'

interface LoginEmailFormProps {
  form: UseFormReturnType<LoginBody, (values: LoginBody) => LoginBody>
}

const LoginEmailForm = ({ form }: LoginEmailFormProps) => {
  return (
    <TextInput
      label="メールアドレス"
      withAsterisk
      autoComplete='email'
      key={form.key('email')}
      {...form.getInputProps('email')}
    />
  )
}

export default LoginEmailForm