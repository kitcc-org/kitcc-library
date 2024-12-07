import { Center } from '@mantine/core';
import { Book } from 'client/client.schemas';
import BookCardCartButton from './BookCardCartButton';

interface BookCardFooterProps {
	book: Book;
}

const BookCardFooter = ({ book }: BookCardFooterProps) => {
	return (
		<Center pt={10}>
			<BookCardCartButton book={book} />
		</Center>
	);
};

export default BookCardFooter;
