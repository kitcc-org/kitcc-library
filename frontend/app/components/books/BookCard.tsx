import { Card } from '@mantine/core'
import BookCardThumbnail from './BookCardThumbnail'
import type { Book } from 'orval/client.schemas'
import BookCardHeader from './BookCardHeader'
import BookCardFooter from './BookCardFooter'
import { useAtom } from 'jotai'
import { userAtom, noUser } from '~/stores/userAtom'

interface BookCardProps {
  book: Book
}

const BookCard = ({ book }: BookCardProps) => {
  const [user,] = useAtom(userAtom)
  return (
    <Card
      shadow='sm'
      padding='lg'
      radius='md'
      withBorder
    >
      <Card.Section withBorder inheritPadding py='xs'>
        <BookCardHeader id={book.id} stock={book.stock} />
      </Card.Section>
      <Card.Section withBorder inheritPadding py='xs'>
        <BookCardThumbnail id={book.id} thumbnail={book.thumbnail} />
      </Card.Section>

      {user !== noUser && <BookCardFooter id={book.id} stock={book.stock} />}
    </Card >
  )
}

export default BookCard