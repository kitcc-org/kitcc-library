import { Button, Stack } from '@mantine/core'
import BookDetailThumbnail from './BookDetailThumbnail'
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { useAtom } from 'jotai';
import { noUser, userAtom } from '~/stores/userAtom';

interface BookDetailControlPanelProps {
  id: number
  thumbnail?: string
}

const BookDetailControlPanel = ({ id, thumbnail }: BookDetailControlPanelProps) => {
  const [user,] = useAtom(userAtom)
  return (
    <Stack
      bg="var(--mantine-color-body)"
      align="stretch"
      justify='center'
      gap='md'
    >
      <BookDetailThumbnail thumbnail={thumbnail} />
      {user !== noUser && <Button leftSection={<MdEdit />} fz='lg' >編集</Button>}
      {user !== noUser && <Button color='red' leftSection={<MdDeleteForever />} fz='lg'>削除</Button>}
    </Stack>
  )
}

export default BookDetailControlPanel