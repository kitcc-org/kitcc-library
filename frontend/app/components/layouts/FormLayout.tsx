import React from 'react'
import type { UseFormReturnType } from '@mantine/form'
import { Center, Paper, Stack } from '@mantine/core'

interface FormLayoutProps<T> {
  form: UseFormReturnType<T, (values: T) => T>
  handleSubmit: (props: T) => void
  children: React.ReactNode
}


const FormLayout = <T,>({
  form,
  handleSubmit,
  children
}: FormLayoutProps<T>) => {
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
        <form onSubmit={form.onSubmit((values) => (handleSubmit(values)))}>
          <Stack
            align='stretch'
            gap='md'
            justify='center'
          >
            {children}
          </Stack>
        </form>
      </Paper>
    </Center>
  )
}

export default FormLayout