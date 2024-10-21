import { Badge, Group, Text } from '@mantine/core'

interface BookCardTitleProps {
  title: string
  volume: number
}

const BookCardTitle = ({ title, volume }: BookCardTitleProps) => {
  return (
    <Group justify='space-between' mt='md' mb='sm'>
      <Text fw={500}>
        {title}
      </Text>
      {(volume > 0) ? <Badge color='blue'>貸し出し可能</Badge> : <Badge color='red' >貸し出し中</Badge>}
    </Group>
  )
}

export default BookCardTitle