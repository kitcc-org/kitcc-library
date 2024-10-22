import { Book } from 'orval/client.schemas'
import BookCard from './BookCard'
import { ScrollArea, SimpleGrid } from '@mantine/core'
import NoBookComponent from './NoBookComponent'

interface BookCardsProps {
  books: Book[]
}

const BookCards = ({ books }: BookCardsProps) => {
  if (books.length === 0) return <NoBookComponent />
  return (
    <ScrollArea h='70dh'>
      <SimpleGrid
        type="container"
        cols={{ base: 1, '500px': 3, '700px': 4, '900px': 5, '1200px': 7 }}
        spacing={{ base: 10, '300px': 'xl' }}
      >
        {books.map((book) => <BookCard key={book.id} book={book} />)}
      </SimpleGrid>
    </ScrollArea>
  )
}

export default BookCards