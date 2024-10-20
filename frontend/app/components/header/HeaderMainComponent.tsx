import HeaderLoginComponent from './HeaderLoginComponent'
import HeaderLogoutComponent from './HeaderLogoutComponent'
import { useAtom } from "jotai"
import { User } from "orval/client.schemas"
import { userAtom, noUser } from "~/stores/userAtom"

const HeaderMainComponent = () => {
  const [user,] = useAtom(userAtom)

  return <>{(user === noUser) ? <HeaderLogoutComponent /> : <HeaderLoginComponent loginUser={user as User}/>}</>
}

export default HeaderMainComponent