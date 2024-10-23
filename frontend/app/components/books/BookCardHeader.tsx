import React from 'react'
import { Checkbox, Group } from '@mantine/core'
import { selectedBooksAtom } from '~/stores/cartAtom'
import { useAtom } from 'jotai'
import { userAtom, noUser } from '~/stores/userAtom'
import type { CartProps } from '~/stores/cartAtom'
import BookCardHeaderBadge from './BookCardHeaderBadge'

interface BookCardHeaderProps {
  id: number
  stock: number
}

const BookCardHeader = ({ id, stock }: BookCardHeaderProps) => {
  const [selectedBook, setSelectedBook] = useAtom(selectedBooksAtom)
  const [user,] = useAtom(userAtom)
  const selectedCheck = (element: CartProps) => element.id === id

  const selectedBookAdd = () => {
    if (selectedBook.some(selectedCheck)) {
      setSelectedBook(selectedBook.filter((element) => element.id !== id))
    } else {
      setSelectedBook([...selectedBook, { id, stock }])
    }
  }

  return (
    <Group justify={user !== noUser ? 'space-between' : 'flex-end'} py={10}>
      {user !== noUser && <Checkbox value={id} checked={selectedBook.some(selectedCheck)} onChange={selectedBookAdd} />}
      <BookCardHeaderBadge stock={stock} />
    </Group>
  )
}

export default BookCardHeader