import { Text } from '@mantine/core'

interface BookDetailDescriptionProps {
  description: string
}

const BookDetailDescription = ({ description }: BookDetailDescriptionProps) => {
  return (
    <Text fz={18}>
      {description}
    </Text>
  )
}

export default BookDetailDescription