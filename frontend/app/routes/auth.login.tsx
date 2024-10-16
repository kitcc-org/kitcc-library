import React from 'react'
import { Button, Center, Paper, PasswordInput, Stack, Text, TextInput } from "@mantine/core";

const LoginPage = () => {
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
          />
          <PasswordInput
            label="パスワード"
            withAsterisk
            autoComplete='current-password'
          />
          <Button>
            ログイン
          </Button>
          <Text
            c='dimmed'
            size='sm'
          >
            アカウントが無い場合、またはパスワードを忘れた場合は、<br/>管理者にお問い合わせください。
          </Text>
        </Stack>
      </Paper>
    </Center>
  )
}

export default LoginPage