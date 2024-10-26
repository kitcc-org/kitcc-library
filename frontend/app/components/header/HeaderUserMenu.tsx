import { Button, Menu } from '@mantine/core'
import { FaUserCircle, FaUser } from "react-icons/fa";
import { LuLogOut, LuShoppingCart } from "react-icons/lu";
import { userAtom } from '~/stores/userAtom';
import { useAtom } from 'jotai';
import { useNavigate } from '@remix-run/react';

interface HeaderUserMenuProps {
  open: () => void
}

const HeaderUserMenu = ({ open }: HeaderUserMenuProps) => {
  const [user,] = useAtom(userAtom)
  const navigate = useNavigate()
  return (
    <Menu shadow="md">
      <Menu.Target>
        <Button leftSection={<FaUserCircle />} variant="default" >
          {user?.name}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<FaUser />} onClick={() => navigate('/home/mypage')} >
          マイページ
        </Menu.Item>
        <Menu.Item leftSection={<LuShoppingCart />} onClick={() => navigate('/home/cart')} >
          カート
        </Menu.Item>
        <Menu.Item leftSection={<LuLogOut />} onClick={() => open()}>
          ログアウト
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default HeaderUserMenu