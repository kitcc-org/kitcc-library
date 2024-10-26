import { Checkbox, Group } from '@mantine/core'
import { selectedBooksAtom } from '~/stores/cartAtom'
import { useAtom } from 'jotai'
import { userAtom } from '~/stores/userAtom'
import type { CartProps } from '~/stores/cartAtom'
import BookCardHeaderBadge from './BookCardHeaderBadge'

interface BookCardHeaderProps {
  id: number
  stock: number
}

const BookCardHeader = ({ id, stock }: BookCardHeaderProps) => {
  const [selectedBook, setSelectedBook] = useAtom(selectedBooksAtom)
  const [user,] = useAtom(userAtom)
  //  この関数は、選択されている本のIDと表示する本のIDを比較します。
  const selectedCheck = (element: CartProps) => element.id === id

  // チェックボックスの状態が変化した時に、すでに選択されている本の配列に含まれている場合、選択を外し、
  // 選択されていなかった場合は、選択します。
  const selectedBookAdd = () => {
    if (selectedBook.some(selectedCheck)) {
      setSelectedBook(selectedBook.filter((element) => element.id !== id))
    } else {
      setSelectedBook([...selectedBook, { id, stock }])
    }
  }

  return (
    <Group justify={!!user ? 'space-between' : 'flex-end'} py={10}>
      {!!user && <Checkbox value={id} checked={selectedBook.some(selectedCheck)} onChange={selectedBookAdd} />}
      <BookCardHeaderBadge stock={stock} />
    </Group>
  )
}

export default BookCardHeader