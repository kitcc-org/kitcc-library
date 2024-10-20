import { Group } from "@mantine/core"
import HeaderBookMenu from "./HeaderBookMenu"
import HeaderLoginButton from "./HeaderLoginButton"

const HeaderLogoutComponent = () => {
  return (
    <Group>
      <HeaderBookMenu />
      <HeaderLoginButton />
    </Group>
  )
}

export default HeaderLogoutComponent