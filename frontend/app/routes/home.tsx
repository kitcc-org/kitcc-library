import { Outlet } from '@remix-run/react'
import { AppShell } from '@mantine/core'
import HeaderComponent from '~/components/header/HeaderComponent'

const Home = () => {
  return (
    <AppShell
      header={{ height: 60 }}
      padding={{ default: 'md', sm: 'sm' }}
    >
      <HeaderComponent />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

export default Home