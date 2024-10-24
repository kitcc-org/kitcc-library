import { AspectRatio, Card, Image, rem } from '@mantine/core'
import { useNavigate } from '@remix-run/react'
import NoImage from '~/img/noImage.png'

interface BookDetailThumbnailProps {
  thumbnail?: string
}

const BookDetailThumbnail = ({ thumbnail }: BookDetailThumbnailProps) => {
  return (
    <AspectRatio ratio={10 / 14}
      style={{ flex: `0 0 ${rem(400)}`, cursor: 'pointer' }}
      component='div'
    >
      <Image
        src={thumbnail ? thumbnail : NoImage}
        alt='Book cover'
      />
    </AspectRatio>
  )
}

export default BookDetailThumbnail