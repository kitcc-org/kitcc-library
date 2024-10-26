import HeaderLoginComponent from './HeaderLoginComponent'
import HeaderLogoutComponent from './HeaderLogoutComponent'
import { useAtom } from "jotai"
import { userAtom } from "~/stores/userAtom"

const HeaderMainComponent = () => {
  const [user,] = useAtom(userAtom)

  return <>{!user ? <HeaderLogoutComponent /> : <HeaderLoginComponent />}</>
}

export default HeaderMainComponent