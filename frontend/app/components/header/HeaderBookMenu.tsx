import { Button, Menu } from "@mantine/core"
import { useNavigate } from "@remix-run/react";
import { FaBook } from "react-icons/fa";
import { LuBookCopy } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { userAtom, noUser } from "~/stores/userAtom";
import { useAtom } from "jotai";

const HeaderBookMenu = () => {
  const navigate = useNavigate()
  const [user,] = useAtom(userAtom)
  return (
    <Menu shadow="md" width='10dw'>
      <Menu.Target>
        <Button leftSection={<FaBook />} variant="default">
          書籍
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
      <Menu.Item leftSection={<LuBookCopy />} onClick={() => navigate('/home')}>
        書籍一覧
      </Menu.Item>
      <Menu.Item leftSection={<FaSearch />} onClick={() => navigate('/home/search')}>
        書籍検索
      </Menu.Item>
      {(user !== noUser) && <Menu.Item leftSection={<LuShoppingCart />} onClick={() => navigate('/home/cart')} >
        カート
      </Menu.Item>}
      </Menu.Dropdown>
    </Menu>
  )
}

export default HeaderBookMenu