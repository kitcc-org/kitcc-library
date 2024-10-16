import React from 'react'
import { useForm } from '@mantine/form'
import { Button, Center, Paper, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import type { LoginBody } from 'orval/kITCCLibraryAPI.schemas';
import { useLogin } from 'orval/kITCCLibraryAPI';
import { useNavigate } from '@remix-run/react';

const LoginPage = () => {
  const loginTask = useLogin()
  const navigate = useNavigate();
  const form = useForm<LoginBody>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: (value) => (/^[\w+\-.]+@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]+$/i.test(value) ? null : '有効でないメールアドレスです'),
      password: (value) => (value.length < 8 ? 'パスワードは8文字以上で入力してください' : null)
    }
  })

  const handleSubmmit = (props: LoginBody) => {
    loginTask.mutate(
      {
        data: props
      },{
        onSuccess: () => {
          navigate('/home/mypage')
        }
      }
    )
  }

  return (
    <Center
      h='100vh'
      w='100%'
    >
      <Paper
        shadow="xl"
        p='xl'
        withBorder
      >
        <form onSubmit={form.onSubmit((values) => (handleSubmmit(values)))}>
        <Stack
          align='stretch'
          gap='md'
          justify='center'
        >
          <Text
            ta='center'
            tt='uppercase'
            size='xl'
          >
            ログイン
          </Text>
          <TextInput
            label="メールアドレス"
            withAsterisk
            autoComplete='email'
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="パスワード"
            withAsterisk
            autoComplete='current-password'
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <Button
            type='submit'
            disabled={loginTask.isPending}
          >
            ログイン
          </Button>
          <Text
            c='dimmed'
            size='sm'
          >
            アカウントが無い場合、またはパスワードを忘れた場合は、<br/>管理者にお問い合わせください。
          </Text>
        </Stack>
        </form>
      </Paper>
    </Center>
  )
}

export default LoginPage