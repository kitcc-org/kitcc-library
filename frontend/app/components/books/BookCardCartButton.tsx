import { Button } from '@mantine/core';
import { useAtom } from 'jotai';
import { BiSolidCartAdd } from 'react-icons/bi';
import { cartAtom } from '~/stores/cartAtom';

interface BookCardCartButtonProps {
	id: number;
	stock: number;
}

const BookCardCartButton = ({ id, stock }: BookCardCartButtonProps) => {
	const [cart, setCart] = useAtom(cartAtom);
	const addCart = () => {
		setCart([...cart, { id, stock }]);
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
