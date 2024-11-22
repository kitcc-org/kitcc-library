import { Button, Center, Dialog, Modal, Stack, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate, useSubmit } from '@remix-run/react';
import { useAtom } from 'jotai';
import { MdDeleteForever } from 'react-icons/md';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { selectedBooksAtom } from '~/stores/bookAtom';
import { cartAtom } from '~/stores/cartAtom';
import { addBooksToCart } from '~/utils/cart';
import { successNotification } from '~/utils/notification';

const BookSelectedDialog = () => {
	const [selectedBook, setSelectedBook] = useAtom(selectedBooksAtom);
	const [cart, setCart] = useAtom(cartAtom);

	const navigate = useNavigate();
	const submit = useSubmit();
	const [opened, { open, close }] = useDisclosure();

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title="本当に削除しますか？"
				centered
			>
				<Center>
					<Button
						leftSection={<RiArrowGoBackLine />}
						color="gray"
						mr={rem(10)}
						onClick={close}
					>
						キャンセル
					</Button>
					<Button
						leftSection={<MdDeleteForever size={20} />}
						color="red"
						onClick={() => {
							submit(JSON.stringify({ selectedBook: selectedBook }), {
								action: '/home?index',
								method: 'DELETE',
								encType: 'application/json',
							});

							setSelectedBook([]);
						}}
					>
						削除する
					</Button>
				</Center>
			</Modal>
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
