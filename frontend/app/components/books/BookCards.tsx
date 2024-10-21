import { Book } from 'orval/kITCCLibraryAPI.schemas'
import BookCard from './BookCard'
import { SimpleGrid } from '@mantine/core'
import NoBookComponent from './NoBookComponent'

interface BookCardsProps {
  books: Book[]
}

const BookCards = ({ books }: BookCardsProps) => {
  if (books.length === 0) return <NoBookComponent />
  return (
    <SimpleGrid
      type="container"
      cols={{ base: 1, '300px': 2, '500px': 5 }}
      spacing={{ base: 10, '300px': 'xl' }}
    >
      {books.map((book) => <BookCard key={book.id} book={book} />)}
    </SimpleGrid>
  )
}

export default BookCards