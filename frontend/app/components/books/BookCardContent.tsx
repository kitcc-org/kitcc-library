import { Table } from '@mantine/core'
import { Book } from 'orval/client.schemas'
import BookCardContentrBadge from './BookCardContentBadge'

interface BookCardContentProps {
  book: Book
}

const BookCardContent = ({ book }: BookCardContentProps) => {
  return (
    <Table>
      <Table.Tr>
        <Table.Th>著者</Table.Th>
        <Table.Td>{book.authors.map((person, num) => <BookCardContentrBadge target={person} key={num} />)}</Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Th>出版社</Table.Th>
        <Table.Td>{book.publisher}</Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Th>ISBN</Table.Th>
        <Table.Td>{book.isbn}</Table.Td>
      </Table.Tr>
    </Table>
  )
}

export default BookCardContent