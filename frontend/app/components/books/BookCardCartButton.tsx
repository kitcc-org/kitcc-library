import { Button } from '@mantine/core';
import { useAtom } from 'jotai';
import { BiSolidCartAdd } from 'react-icons/bi';
import { cartAtom } from '~/stores/cartAtom';
import { addBooksToCart } from '~/utils/cart';

interface BookCardCartButtonProps {
	id: number;
	stock: number;
	thumbnail?: string;
}

const BookCardCartButton = ({
	id,
	stock,
	thumbnail,
}: BookCardCartButtonProps) => {
	const [cart, setCart] = useAtom(cartAtom);
	const addCart = () => {
		setCart(addBooksToCart(cart, [{ id, stock, thumbnail }]));
	};
	return (
		<Button
			variant="filled"
			color="yellow"
			radius="xl"
			disabled={stock === 0}
			onClick={addCart}
			leftSection={<BiSolidCartAdd size={23} />}
			fz={10}
		>
			カートに入れる
		</Button>
	);
};

export default BookCardCartButton;
