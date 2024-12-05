import { Button } from '@mantine/core';
import { useNavigate } from '@remix-run/react';
import { Book } from 'client/client.schemas';
import { useAtom } from 'jotai';
import { BiSolidCartAdd } from 'react-icons/bi';
import { cartAtom } from '~/stores/cartAtom';
import { addBooksToCart } from '~/utils/cart';

interface BookCardCartButtonProps {
	book: Book;
}

const BookCardCartButton = ({ book }: BookCardCartButtonProps) => {
	const [cart, setCart] = useAtom(cartAtom);
	const navigate = useNavigate();
	const addCart = () => {
		setCart(addBooksToCart(cart, [book]));
		navigate('/home/cart');
	};
	return (
		<Button
			variant="filled"
			color="yellow"
			radius="xl"
			disabled={book.stock === 0}
			onClick={addCart}
			leftSection={<BiSolidCartAdd size={23} />}
			fz={{
				base: 10,
				md: 'xs',
			}}
		>
			カートに入れる
		</Button>
	);
};

export default BookCardCartButton;
