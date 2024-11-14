import { Center } from '@mantine/core';
import BookCardCartButton from './BookCardCartButton';

interface BookCardFooterProps {
	id: number;
	stock: number;
	thumbnail?: string;
}

const BookCardFooter = ({ id, stock, thumbnail }: BookCardFooterProps) => {
	return (
		<Center pt={10}>
			<BookCardCartButton id={id} stock={stock} thumbnail={thumbnail} />
		</Center>
	);
};

export default BookCardFooter;
