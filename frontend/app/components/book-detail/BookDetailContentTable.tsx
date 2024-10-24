import { Group, rem, Stack, Table, Text } from '@mantine/core'
import { Book } from 'orval/client.schemas'
import React from 'react'
import BookDetailAuthorBadge from './BookDetailAuthorBadge'

interface BookDetailContentTableProps {
  book: Book
}

const BookDetailContentTable = ({ book }: BookDetailContentTableProps) => {
  return (
    <Stack
      gap='sm'
      align='stretch'
      justify='flex-start'
    >
      <Text>書籍情報</Text>
      <Table>
        <Table.Tr>
          <Table.Th>著者</Table.Th>
          <Table.Td><Group gap={rem(7)}>{book.authors.map((author) => <BookDetailAuthorBadge name={author} />)}</Group></Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>出版社</Table.Th>
          <Table.Td>{book.publisher}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>出版日</Table.Th>
          <Table.Td>{book.publishedDate}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>ISBN</Table.Th>
          <Table.Td>{book.isbn}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>在庫数</Table.Th>
          <Table.Td>{book.stock}</Table.Td>
        </Table.Tr>
      </Table>
    </Stack>
  )
}

export default BookDetailContentTable