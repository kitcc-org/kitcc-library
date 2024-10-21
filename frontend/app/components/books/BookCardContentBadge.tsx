import { Badge } from '@mantine/core'

interface BookCardContentrBadgeProps {
  target: string
}

const BookCardContentrBadge = ({ target }: BookCardContentrBadgeProps) => {
  return (
    <Badge variant="white" color="gray" radius="sm">{target}</Badge>
  )
}

export default BookCardContentrBadge