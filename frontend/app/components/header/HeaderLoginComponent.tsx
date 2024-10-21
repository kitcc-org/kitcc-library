import { Button, Group, Modal, Stack, Text } from '@mantine/core'
import HeaderBookMenu from './HeaderBookMenu'
import HeaderUserMenu from './HeaderUserMenu';
import { useDisclosure } from '@mantine/hooks'
import { useLogout } from 'orval/client';
import { useNavigate } from '@remix-run/react';
import { LuLogOut } from "react-icons/lu";
import { errorNotifications, successNotifications } from '~/utils/notification';
import HeaderUsersMenu from './HeaderUsersMenu';

const HeaderLoginComponent = () => {
  const [opened, { open, close }] =  useDisclosure()
  const navigate = useNavigate()
  const logoutTask = useLogout()
  const handleLogoout = () => {
    logoutTask.mutate(undefined, {
      onSuccess: (response) => {
        switch(response.status) {
          case 204:
            successNotifications('ログアウトしました')
            navigate('/home')
            break
          case 500:
            errorNotifications('サーバーエラーが発生しました')
            break
          default:
            errorNotifications('エラーが発生しました')
            break
        }
      },
      onError: () => {
        errorNotifications('ログアウトに失敗しました')
        close()
      }
    })
  }
  return (
    <>
    <Group>
      <HeaderBookMenu />
      <HeaderUsersMenu />
      <HeaderUserMenu open={open} />
    </Group>
    <Modal opened={opened && !(logoutTask.isPending)} onClose={close} >
      <Stack
        align='stretch'
        justify='center'
        gap='lg'
      >
        <Text ta='center' size='xl'>ログアウトしますか？</Text>
        <Group justify='center' grow>
          <Button onClick={close} variant='light'>キャンセル</Button>
          <Button onClick={() => handleLogoout()} leftSection={<LuLogOut />}>
            ログアウト
          </Button>
        </Group>
      </Stack>
    </Modal>
    </>
  )
}

export default HeaderLoginComponent