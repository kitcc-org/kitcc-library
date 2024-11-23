import { Button, Center, Dialog, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from '@remix-run/react';
import { useAtom } from 'jotai';
import { selectedBooksAtom } from '~/stores/bookAtom';
import { cartAtom } from '~/stores/cartAtom';
import { addBooksToCart } from '~/utils/cart';
import { successNotification } from '~/utils/notification';
import BookDeleteModal from './BookDeleteModal';

const BookSelectedDialog = () => {
	const [selectedBook, setSelectedBook] = useAtom(selectedBooksAtom);
	const [cart, setCart] = useAtom(cartAtom);

	const navigate = useNavigate();
	const [opened, { open, close }] = useDisclosure();

	return (
		<>
			<BookDeleteModal disclosure={{ opened, close }} />
			<Dialog
				// モーダルとダイアログを同時に表示しない
				opened={selectedBook.length > 0 && !opened}
				onClose={() => {
					// モーダルが表示されていなければ
					if (!opened) {
						// 選択をリセットする
						setSelectedBook([]);
					}
				}}
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
					<Button
						fz="sm"
						color="yellow"
						onClick={() => {
							setCart(addBooksToCart(cart, selectedBook));
							setSelectedBook([]);
							successNotification('カートに追加しました');
							navigate('/home/cart');
						}}
					>
						カートに入れる
					</Button>
					<Button
						fz="sm"
						color="red"
						onClick={() => {
							open();
						}}
					>
						削除する
					</Button>
					<Button
						fz="sm"
						variant="light"
						bd="solid 2px"
						onClick={() => setSelectedBook([])}
					>
						選択を解除する
					</Button>
				</Stack>
			</Dialog>
		</>
	);
};

export default BookSelectedDialog;
