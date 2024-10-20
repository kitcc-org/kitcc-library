import { Button, Menu } from '@mantine/core'
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { userAtom } from '~/stores/userAtom';
import { useAtom } from 'jotai';
import { useNavigate } from '@remix-run/react';

interface HeaderUserMenuProps {
  open: () => void
}

const HeaderUserMenu = ({open}: HeaderUserMenuProps) => {
  const [user,] = useAtom(userAtom)
  const navigate = useNavigate()
  return (
    <Menu shadow="md" width='10dw'>
      <Menu.Target>
        <Button leftSection={<FaUserCircle />} variant="default" >
          {user.name}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<FaUser />} onClick={() => navigate('/home/mypage')} >
          マイページ
        </Menu.Item>
        <Menu.Item leftSection={<FaUsers />} onClick={() => navigate('/home/users')}>
          ユーザー一覧
        </Menu.Item>
        <Menu.Item leftSection={<FaUserPlus />} onClick={() => navigate('/home/user-add')}>
          ユーザー追加
        </Menu.Item>
        <Menu.Item leftSection={<LuLogOut />} onClick={() => open()}>
          ログアウト
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default HeaderUserMenu