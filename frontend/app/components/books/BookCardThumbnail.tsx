import { AspectRatio, Card, Image, rem } from '@mantine/core'
import NoImage from '~/img/noImage.png'

interface BookCardThumbnailProps {
  thumbnail?: string
}

const BookCardThumbnail = ({ thumbnail }: BookCardThumbnailProps) => {
  return (
    <Card.Section>
      <AspectRatio ratio={10 / 16}
        style={{ flex: `0 0 ${rem(400)}` }}
      >
        <Image
          src={thumbnail ? thumbnail : NoImage}
          alt='Book cover'
        />
      </AspectRatio>
    </Card.Section>
  )
}

export default BookCardThumbnail