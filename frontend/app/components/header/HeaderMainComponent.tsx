import HeaderLoginComponent from './HeaderLoginComponent'
import HeaderLogoutComponent from './HeaderLogoutComponent'
import { useAtom } from "jotai"
import { userAtom, noUser } from "~/stores/userAtom"

const HeaderMainComponent = () => {
  const [user,] = useAtom(userAtom)

  return <>{(user === noUser) ? <HeaderLogoutComponent /> : <HeaderLoginComponent/>}</>
}

export default HeaderMainComponent