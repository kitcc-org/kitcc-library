import { AppShell, Space, Stack } from '@mantine/core'
import { getBooksResponse } from 'orval/client'
import ErrorComponent from '../common/ErrorComponent'
import BookCards from './BookCards'
import type { UseFormReturnType } from '@mantine/form'
import type { GetBooksParams } from 'orval/client.schemas'
import BookSearchComponent from '../book-search/BookSearchComponent'
import ContentsHeader from '../common/ContentsHeader'
import PaginationComponent from '../common/PaginationComponent'

interface BookListComponentProps {
  booksResponse: getBooksResponse
  form: UseFormReturnType<GetBooksParams, (values: GetBooksParams) => GetBooksParams>
  handleSubmit: (props: GetBooksParams) => void
  isOpen: boolean
  open: () => void
  close: () => void
  handlePaginationChange: (newPage: number) => void
  handleLimitChange: (newLimit: number) => void
  page?: number
  limit?: number
  totalBook: number
}

const BookListComponent = ({
  booksResponse,
  form,
  handleSubmit,
  isOpen,
  open,
  close,
  handlePaginationChange,
  handleLimitChange,
  page,
  limit,
  totalBook
}: BookListComponentProps) => {
  return (
    <Stack
      bg="var(--mantine-color-body)"
      align="stretch"
      justify='flex-start'
    >
      <BookSearchComponent isOpen={isOpen} open={open} close={close} form={form} handleSubmit={handleSubmit} />
      <ContentsHeader page={page} limit={limit} total={totalBook} handleLimitChange={handleLimitChange} />
      {booksResponse.status !== 200 ? <ErrorComponent message={"書籍情報を取得できませんでした。"} /> : <BookCards books={booksResponse.data.books} />}
      <PaginationComponent totalNum={totalBook} page={page} limit={limit} handlePaginationChange={handlePaginationChange} />
    </Stack>
  )
}

export default BookListComponent