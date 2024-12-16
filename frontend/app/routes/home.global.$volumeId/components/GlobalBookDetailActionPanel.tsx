import { Stack } from '@mantine/core';
import { GoogleBook } from 'client/client.schemas';
import BookDetailThumbnail from '~/routes/home.books.$bookId/components/BookDetailThumbnail';
import GlobalBookDetailControlButtons from './GlobalBookDetailControlButtons';

interface BookDetailActionPanelProps {
	book: GoogleBook;
	totalBook?: number;
}

const BookDetailActionPanel = ({
	book,
	totalBook,
}: BookDetailActionPanelProps) => {
	return (
		<Stack
			bg="var(--mantine-color-body)"
			align="stretch"
			justify="center"
			gap="md"
		>
			<BookDetailThumbnail thumbnail={book.thumbnail} />
			<GlobalBookDetailControlButtons
				book={book as GoogleBook}
				totalBook={totalBook ?? 0}
			/>
		</Stack>
	);
};

export default BookDetailActionPanel;
