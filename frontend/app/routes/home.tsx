import { Outlet } from '@remix-run/react'
import { AppShell, Container } from '@mantine/core'
import HeaderComponent from '~/components/header/HeaderComponent'

const Home = () => {
  return (
    <AppShell
      header={{ height: 70 }}
      padding={{ default: 'md', sm: 'sm' }}
    >
      <HeaderComponent />
      <Container size='xl'>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </Container>
    </AppShell>
  )
}

export default Home