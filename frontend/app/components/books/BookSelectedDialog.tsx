import { Button, Center, Dialog, Group, Stack, Text } from '@mantine/core'
import React from 'react'
import { selectedBooksAtom } from '~/stores/cartAtom'
import { useAtom } from 'jotai'

const BookSelectedDialog = () => {
  const [selectedBook, setSelectedBook] = useAtom(selectedBooksAtom)
  return (
    <Dialog
      opened={selectedBook.length > 0}
      onClose={() => setSelectedBook([])}
    // size='650px'
    >
      <Stack
        bg="var(--mantine-color-body)"
        align="stretch"
        justify="center"
        gap="md"
      >
        <Center>
          <Text fw={500}>
            選択中の本が{selectedBook.length}冊あります
          </Text>
        </Center>
        {/* <Group justify='flex-end'> */}
        <Button fz='xs'>
          選択中の本をカートに入れる
        </Button>
        <Button fz='xs'>
          選択中の本をデータベースから削除する
        </Button>
        <Button fz='xs' onClick={() => setSelectedBook([])}>
          選択を解除する
        </Button>
        {/* </Group> */}
      </Stack>
    </Dialog>
  )
}

export default BookSelectedDialog