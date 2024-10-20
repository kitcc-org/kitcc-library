import { AppShell, Group } from '@mantine/core'
import HeaderTitleLogo from './HeaderTitleLogo'
import HeaderMainComponent from './HeaderMainComponent'

const HeaderComponent = () => {
  return (
    <AppShell.Header
      bg='theme.color'
    >
      <Group
        h='100%'
        justify='space-between'
      >
        <HeaderTitleLogo />
        <HeaderMainComponent />
      </Group>
    </AppShell.Header>
  )
}

export default HeaderComponent