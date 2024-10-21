import { Card } from '@mantine/core'
import BookCardThumbnail from './BookCardThumbnail'
import BookCardTitle from './BookCardTitle'
import type { Book } from 'orval/kITCCLibraryAPI.schemas'
import BookCardContent from './BookCardContent'

interface BookCardProps {
  book: Book
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card
      shadow='sm'
      padding='lg'
      radius='md'
      withBorder
      component='a'
      href={`/home//books/${book.id}`}
    >
      <BookCardThumbnail thumbnail={book.thumbnail} />
      <BookCardTitle title={book.title} volume={book.stock} />
      <BookCardContent book={book} />
    </Card>
  )
}

export default BookCard