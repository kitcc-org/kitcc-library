import { ScrollArea, SimpleGrid } from '@mantine/core';
import { useAtom } from 'jotai';
import { cartAtom } from '~/stores/cartAtom';
import CartCard from './CartCard';

const CartCards = () => {
	const [cart] = useAtom(cartAtom);

	return (
		<ScrollArea h="70dh">
			<SimpleGrid
				type="container"
				cols={{
					base: 2,
					'500px': 3,
					'800px': 4,
					'1100px': 5,
					'1400px': 6,
					'1700px': 7,
				}}
				// 画面幅が300pxを超えた場合、カードの間をxlにする
				spacing={{ base: 10, '300px': 'xl' }}
			>
				{cart.map((book, index) => (
					<CartCard key={index} book={book} />
				))}
			</SimpleGrid>
		</ScrollArea>
	);
};

export default CartCards;
