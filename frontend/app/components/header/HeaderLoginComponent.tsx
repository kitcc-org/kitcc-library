import type { User } from 'orval/client.schemas'

interface HeaderLoginComponentProps {
  loginUser: User
}

const HeaderLoginComponent = ({loginUser}: HeaderLoginComponentProps) => {
  return (
    <div>HeaderLoginComponent</div>
  )
}

export default HeaderLoginComponent