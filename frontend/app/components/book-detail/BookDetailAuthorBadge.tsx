import { Badge } from '@mantine/core'
import { useNavigate } from '@remix-run/react'
import React from 'react'

interface BookDetailAuthorBadgeProps {
  name: string
}

const BookDetailAuthorBadge = ({ name }: BookDetailAuthorBadgeProps) => {
  return (
    <Badge
      component='a'
      href={`/home?author=${name}`}
      style={{ cursor: 'pointer' }}
      variant='outline'
    >
      {name}
    </Badge >
  )
}

export default BookDetailAuthorBadge