import React from 'react'
import { AppShell, Group } from '@mantine/core'
import HeaderTitleLogo from './HeaderTitleLogo'

const HeaderComponent = () => {
  return (
    <AppShell.Header>
      <Group
        h='100%'
        justify='space-between'
      >
        <HeaderTitleLogo />
      </Group>
    </AppShell.Header>
  )
}

export default HeaderComponent