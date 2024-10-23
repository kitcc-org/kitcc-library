import { Badge, Group, Text } from '@mantine/core'

interface BookCardTitleProps {
  title: string
  volume: number
}

const BookCardTitle = ({ title, volume }: BookCardTitleProps) => {
  return (
    <Text fw={500}>
      {title}
    </Text>
  )
}

export default BookCardTitle