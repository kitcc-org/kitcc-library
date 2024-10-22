import { AppShell, Space, Stack } from '@mantine/core'
import { getBooksResponse } from 'orval/client'
import ErrorBookComponent from './ErrorBookComponent'
import BookCards from './BookCards'
import type { UseFormReturnType } from '@mantine/form'
import type { GetBooksParams } from 'orval/client.schemas'
import SearchComponent from '../search/SearchComponent'

interface BookListComponentProps {
  booksResponse: getBooksResponse
  form: UseFormReturnType<GetBooksParams, (values: GetBooksParams) => GetBooksParams>
  handleSubmit: (props: GetBooksParams) => void
  isOpen: boolean
  open: () => void
  close: () => void
}

const BookListComponent = ({
  booksResponse,
  form,
  handleSubmit,
  isOpen,
  open,
  close
}: BookListComponentProps) => {
  return (
    <AppShell.Main>
      <Stack
        bg="var(--mantine-color-body)"
        align="stretch"
        justify='flex-start'
      >
        <SearchComponent isOpen={isOpen} open={open} close={close} form={form} handleSubmit={handleSubmit} />
        {booksResponse.status !== 200 ? <ErrorBookComponent /> : <BookCards books={booksResponse.data.books} />}
      </Stack>
    </AppShell.Main>
  )
}

export default BookListComponent