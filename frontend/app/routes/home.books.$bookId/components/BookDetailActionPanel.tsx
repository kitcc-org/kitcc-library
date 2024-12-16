import { Stack } from '@mantine/core';
import { Book } from 'client/client.schemas';
import BookDetailControlButtons from './BookDetailControlButtons';
import BookDetailThumbnail from './BookDetailThumbnail';

interface BookDetailActionPanelProps {
	book: Book;
}

const BookDetailActionPanel = ({ book }: BookDetailActionPanelProps) => {
	return (
		<Stack
			bg="var(--mantine-color-body)"
			align="stretch"
			justify="center"
			gap="md"
		>
			<BookDetailThumbnail thumbnail={book.thumbnail} />
			<BookDetailControlButtons id={Number(book.id)} />
		</Stack>
	);
};

export default BookDetailActionPanel;
