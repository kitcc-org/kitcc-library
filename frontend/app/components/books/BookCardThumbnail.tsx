import { AspectRatio, Card, Image, rem } from '@mantine/core'
import { useNavigate } from '@remix-run/react'
import NoImage from '~/img/noImage.png'

interface BookCardThumbnailProps {
  id: number
  thumbnail?: string
}

const BookCardThumbnail = ({ id, thumbnail }: BookCardThumbnailProps) => {
  const navigate = useNavigate()
  return (
    <AspectRatio ratio={10 / 14}
      style={{ flex: `0 0 ${rem(400)}`, cursor: 'pointer' }}
      component='div'
      onClick={() => navigate(`books/${id}`)}
    >
      <Image
        src={thumbnail ? thumbnail : NoImage}
        alt='Book cover'
      />
    </AspectRatio>
  )
}

export default BookCardThumbnail