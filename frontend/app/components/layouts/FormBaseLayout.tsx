import React from 'react'
import { Center, Paper } from '@mantine/core'

interface FormBaseLayoutProps {
  children: React.ReactNode
}

const FormBaseLayout = ({ children }: FormBaseLayoutProps) => {
  return (
    <Center
      h='100vh'
      w='100%'
    >
      <Paper
        shadow="xl"
        p='xl'
        withBorder
      >
        {children}
      </Paper >
    </Center >
  )
}

export default FormBaseLayout