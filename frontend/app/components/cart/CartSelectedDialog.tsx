import { Button, Dialog, Stack } from '@mantine/core';
import { useAtom } from 'jotai';
import { cartAtom, selectedCartBooksAtom } from '~/stores/cartAtom';
import { removeBooksFromCart } from '~/utils/cart';

interface CartSelectedDialogProps {
	handleBorrowButtonClick: () => void;
}

const CartSelectedDialog = ({
	handleBorrowButtonClick,
}: CartSelectedDialogProps) => {
	const [selectedCartBook, setSelectedCartBook] = useAtom(
		selectedCartBooksAtom,
	);
	const [cart, setCart] = useAtom(cartAtom);

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
				<Button fz="xs" color="blue" onClick={handleBorrowButtonClick}>
					借りる
				</Button>
				<Button
					fz="xs"
					color="red"
					onClick={() => {
						setCart(removeBooksFromCart(cart, selectedCartBook));
						setSelectedCartBook([]);
					}}
				>
					カートから削除する
				</Button>
				<Button
					fz="xs"
					variant="light"
					bd="solid 2px"
					onClick={() => setSelectedCartBook([])}
				>
					選択を解除する
				</Button>
			</Stack>
		</Dialog>
	);
	return <div>CartSelectedDialog</div>;
};

export default CartSelectedDialog;
