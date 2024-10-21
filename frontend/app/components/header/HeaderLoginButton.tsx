import { Button } from '@mantine/core'
import { useNavigate } from '@remix-run/react'
import { LuLogIn } from 'react-icons/lu'

const HeaderLoginButton = () => {
  const navigate = useNavigate()
  return (
    <Button variant='default' leftSection={<LuLogIn />} onClick={() => navigate('/auth/login')}>
      ログイン
    </Button>
  )
}

export default HeaderLoginButton