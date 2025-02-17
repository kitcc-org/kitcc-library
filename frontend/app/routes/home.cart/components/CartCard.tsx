import { Card } from '@mantine/core';
import BookCardThumbnail from '~/routes/home._index/components/BookCardThumbnail';
import { CartProps } from '~/stores/cartAtom';
import CartCardHeader from './CartCardHeader';

interface CartCardProps {
	book: CartProps;
}

const CartCard = ({ book }: CartCardProps) => {
	return (
		<Card shadow="sm" radius="md" pb="xs" withBorder>
			<Card.Section withBorder inheritPadding>
				<CartCardHeader
					id={book.id}
					stock={book.stock}
					volume={book.volume}
					thumbnail={book.thumbnail}
				/>
			</Card.Section>
			<Card.Section withBorder inheritPadding py="xs">
				<BookCardThumbnail book={book} />
			</Card.Section>
		</Card>
	);
};

export default CartCard;
