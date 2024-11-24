import { Button, Dialog, Stack } from '@mantine/core';
import { useSubmit } from '@remix-run/react';
import { useAtom } from 'jotai';
import { cartAtom, CartProps, selectedCartBooksAtom } from '~/stores/cartAtom';
import { removeBooksFromCart } from '~/utils/cart';
import { errorNotification } from '~/utils/notification';

const CartSelectedDialog = () => {
	// prettier-ignore
	const [selectedCartBook, setSelectedCartBook] = useAtom(selectedCartBooksAtom);
	const [cart, setCart] = useAtom(cartAtom);

	const submit = useSubmit();

	// 貸し出し数が蔵書数を超えていないかチェックする
	const checkStock = (element: CartProps) => element.stock < element.volume;

	const handleBorrowButtonClick = () => {
		if (selectedCartBook.length > 0 && !selectedCartBook.some(checkStock)) {
			submit(JSON.stringify({ selectedCartBook: selectedCartBook }), {
				action: '/home/cart',
				method: 'PATCH',
				encType: 'application/json',
			});
			setCart(removeBooksFromCart(cart, selectedCartBook));
			setSelectedCartBook([]);
		} else {
			errorNotification('在庫が足りません');
		}
	};

	return (
		<Dialog
			opened={selectedCartBook.length > 0}
			onClose={() => setSelectedCartBook([])}
		>
			<Stack
				bg="var(--mantine-color-body)"
				align="stretch"
				justify="center"
				gap="md"
			>
				<Button fz="sm" color="blue" onClick={handleBorrowButtonClick}>
					借りる
				</Button>
				<Button
					fz="sm"
					color="red"
					onClick={() => {
						setCart(removeBooksFromCart(cart, selectedCartBook));
						setSelectedCartBook([]);
					}}
				>
					カートから削除する
				</Button>
				<Button
					fz="sm"
					variant="light"
					bd="solid 2px"
					onClick={() => setSelectedCartBook([])}
				>
					選択を解除する
				</Button>
			</Stack>
		</Dialog>
	);
};

export default CartSelectedDialog;
