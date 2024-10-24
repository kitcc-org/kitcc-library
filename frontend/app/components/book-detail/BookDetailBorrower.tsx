import { Badge, Group, rem, Stack, Text } from '@mantine/core'
import { useGetLoans } from 'orval/client'
import React from 'react'

const BookDetailBorrower = () => {
  const loans = useGetLoans()

  return (
    <Stack
      gap='sm'
      align='stretch'
      justify='flex-start'
    >
      <Text>借りている人</Text>
      <Group gap={rem(7)}>
        <Badge variant="light" color="rgba(0, 0, 0, 1)">
          {loans.data?.data?.loans.map((loans) => loans.userId)}
        </Badge>
      </Group>
    </Stack>
  )
}

export default BookDetailBorrower