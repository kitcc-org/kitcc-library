import { Text } from '@mantine/core'
import React from 'react'

interface BookDetailDescriptionProps {
  description: string
}

const BookDetailDescription = ({ description }: BookDetailDescriptionProps) => {
  return (
    <Text>
      {description}
    </Text>
  )
}

export default BookDetailDescription