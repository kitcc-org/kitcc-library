import { AppShell, Stack } from '@mantine/core'
import { getBooksResponse } from 'orval/client'
import ErrorBookComponent from './ErrorBookComponent'
import BookCards from './BookCards'

interface BookListComponentProps {
  booksResponse: getBooksResponse
}

const BookListComponent = ({ booksResponse }: BookListComponentProps) => {
  return (
    <AppShell.Main>
      <Stack
        h='70vh'
        bg="var(--mantine-color-body)"
        align="stretch"
        justify="center"
        gap="md"
      >
        {booksResponse.status !== 200 ? <ErrorBookComponent /> : <BookCards books={booksResponse.data.books} />}
      </Stack>
    </AppShell.Main>
  )
}

export default BookListComponent