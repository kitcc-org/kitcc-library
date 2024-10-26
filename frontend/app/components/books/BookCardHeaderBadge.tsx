import { Badge } from '@mantine/core'

interface BookCardHeaderBadgeProps {
  stock: number
}

const BookCardHeaderBadge = ({ stock }: BookCardHeaderBadgeProps) => {
  if (stock > 0) return <Badge color='lime' radius='xs'>貸出可</Badge>
  else return <Badge color='red' radius='xs'>貸出不可</Badge>
}

export default BookCardHeaderBadge