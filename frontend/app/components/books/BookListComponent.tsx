import { AppShell } from '@mantine/core'
import { getBooksResponse } from 'orval/kITCCLibraryAPI'
import ErrorBookComponent from './ErrorBookComponent'
import BookCards from './BookCards'

interface BookListComponentProps {
  booksResponse: getBooksResponse
}

const BookListComponent = ({ booksResponse }: BookListComponentProps) => {
  return (
    <AppShell.Main>
      {booksResponse.status !== 200 ? <ErrorBookComponent /> : <BookCards books={booksResponse.data} />}
    </AppShell.Main>
  )
}

export default BookListComponent