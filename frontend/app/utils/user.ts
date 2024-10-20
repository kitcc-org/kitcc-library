import { useAtom } from "jotai"
import { useGetUser } from "orval/client"
import { User } from "orval/client.schemas"
import { userAtom } from "~/stores/userAtom"
import { noUser } from "~/stores/userAtom"

export const getLoginUser = (): undefined | User => {
  const [user, setUser] = useAtom(userAtom)
  const userId = getCookieUserId()
  if (!userId) {
    return undefined
  } else {
    if (user !== noUser) return user as User
    else {
      // ユーザ情報を取得するAPIを呼び出す。
      const loginUser = useGetUser(userId)
      if(!loginUser.data) return undefined
      else if (loginUser.data.status !== 200) return undefined
      else {
        setUser(loginUser.data.data as User)
        return loginUser.data.data as User
      }
    }
  }
}

const getCookieUserId = () => {
  return document.cookie
  .split("; ")
  .find((row) => row.startsWith("user_id="))
  ?.split("=")[1];
}