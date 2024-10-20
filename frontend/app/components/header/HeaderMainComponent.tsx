import HeaderLoginComponent from './HeaderLoginComponent'
import HeaderLogoutComponent from './HeaderLogoutComponent'
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

const HeaderMainComponent = () => {
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

  return <>{(user === noUser) ? <HeaderLogoutComponent /> : <HeaderLoginComponent loginUser={user as User}/>}</>
}

export default HeaderMainComponent