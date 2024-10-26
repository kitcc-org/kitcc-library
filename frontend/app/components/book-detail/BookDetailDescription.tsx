import { Text } from '@mantine/core'

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