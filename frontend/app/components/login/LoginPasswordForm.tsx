import type { UseFormReturnType } from '@mantine/form'
import type { LoginBody } from 'orval/client.schemas'
import { PasswordInput } from '@mantine/core'

interface LoginPasswordFormProps {
  form: UseFormReturnType<LoginBody, (values: LoginBody) => LoginBody>
}

const LoginPasswordForm = ({ form }: LoginPasswordFormProps) => {
  return (
    <PasswordInput
      label="パスワード"
      withAsterisk
      autoComplete='current-password'
      key={form.key('password')}
      {...form.getInputProps('password')}
    />
  )
}

export default LoginPasswordForm