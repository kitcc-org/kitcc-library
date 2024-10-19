import { useForm } from '@mantine/form'
import { Button, Center, Paper, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import type { LoginBody } from 'orval/kITCCLibraryAPI.schemas';
import { useLogin } from 'orval/kITCCLibraryAPI';
import { useNavigate } from '@remix-run/react';
import { errorNotifications, successNotifications } from '~/utils/notification';

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
      password: (value) => {
        if(value.length < 8) 
          return 'パスワードは8文字以上で入力してください'
        else if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value))
          return null
        else  
          return 'パスワードにはアルファベットと数字を含んでください'
        }
    }
  })

  const handleSubmmit = (props: LoginBody) => {
    loginTask.mutate(
      {
        data: props
      },{
        onSuccess: (response) => {
          switch(response.status){
            case 200:
              successNotifications('ログインに成功しました')
              document.cookie = `__Secure-user_id=${response.data.id}; path=/`
              document.cookie = `__Secure-session_token=${response.data.sessionToken}; path=/`
              navigate('/home/mypage')
              break
            case 400:
              errorNotifications('メールアドレスまたはパスワードが間違っています')
              break
            case 401:
              errorNotifications('メールアドレスまたはパスワードが間違っています')
              break
            case 404:
              errorNotifications("ユーザーが見つかりません")
              break
            case 500:
              errorNotifications('サーバーエラーが発生しました')
              break
            default:
              errorNotifications('エラーが発生しました')
          }
        },
        onError: (error) => {
          errorNotifications('APIに問題が発生しています。サーバが起動されているか確認してください。')
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