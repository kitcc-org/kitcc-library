import { Button, Center, Dialog, Stack, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import { selectedBooksAtom } from '~/stores/cartAtom';

const BookSelectedDialog = () => {
	const [selectedBook, setSelectedBook] = useAtom(selectedBooksAtom);
	return (
		<Dialog
			opened={selectedBook.length > 0}
			onClose={() => setSelectedBook([])}
		>
			<Stack
				bg="var(--mantine-color-body)"
				align="stretch"
				justify="center"
				gap="md"
			>
				<Center>
					<Text fw={500}>選択中の本が{selectedBook.length}冊あります</Text>
				</Center>
				<Button fz="xs" color="yellow">
					選択中の本をカートに入れる
				</Button>
				<Button fz="xs" color="red">
					選択中の本を削除する
				</Button>
				<Button
					fz="xs"
					variant="light"
					bd="solid"
					onClick={() => setSelectedBook([])}
				>
					選択を解除する
				</Button>
			</Stack>
		</Dialog>
	);
};

export default BookSelectedDialog;
