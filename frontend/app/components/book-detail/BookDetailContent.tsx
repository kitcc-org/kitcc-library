import { Stack } from '@mantine/core'
import { Book } from 'orval/client.schemas'
import BookDetailTitle from './BookDetailTitle'
import BookDetailContentTable from './BookDetailContentTable'
import BookDetailDescription from './BookDetailDescription'
import { useAtom } from 'jotai'
import { userAtom } from '~/stores/userAtom'
import BookDetailBorrower from './BookDetailBorrower'

interface BookDetailComponentProps {
  book: Book
}

const BookDetailContent = ({ book }: BookDetailComponentProps) => {
  const [user] = useAtom(userAtom)
  return (
    <Stack
      bg="var(--mantine-color-body)"
      align="stretch"
      justify='flex-start'
      gap='xl'
    >
      <BookDetailTitle title={book.title} />
      <BookDetailContentTable book={book} />
      <BookDetailDescription description={book.description} />
      {!!user && <BookDetailBorrower />}
    </Stack>
  )
}

export default BookDetailContent