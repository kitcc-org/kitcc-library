import { AppShell, Group } from '@mantine/core'
import HeaderTitleLogo from './HeaderTitleLogo'
import HeaderMainComponent from './HeaderMainComponent'
import { useAtom } from "jotai"
import { getUser } from "orval/client"
import { User } from "orval/client.schemas"
import { userAtom, noUser } from "~/stores/userAtom"

const getCookieUserId = () => {
  if (typeof document === "undefined") return undefined
  return document.cookie
  .split("; ")
  .find((row) => row.startsWith("user_id="))
  ?.split("=")[1];
}

const HeaderComponent = () => {
  const [user, setUser] = useAtom(userAtom)
  const userId = getCookieUserId()
  if (!!userId) {
    if (user === noUser) {
      // ユーザ情報を取得するAPIを呼び出す。
      getUser(userId).then((response) => {
        if (response.status === 200) {
          setUser(response.data as User)
        }
      })
    }
  }
  return (
    <AppShell.Header
      bg='theme.color'
    >
      <Group
        h='100%'
        justify='space-between'
      >
        <HeaderTitleLogo />
        <HeaderMainComponent />
      </Group>
    </AppShell.Header>
  )
}

export default HeaderComponent