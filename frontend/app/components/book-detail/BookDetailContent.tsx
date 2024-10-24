import { Stack } from '@mantine/core'
import { Book } from 'orval/client.schemas'
import React from 'react'
import BookDetailTitle from './BookDetailTitle'
import BookDetailContentTable from './BookDetailContentTable'
import BookDetailDescription from './BookDetailDescription'

interface BookDetailComponentProps {
  book: Book
}

const BookDetailContent = ({ book }: BookDetailComponentProps) => {
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
    </Stack>
  )
}

export default BookDetailContent