import { Stack } from '@mantine/core';
import { useLocation } from '@remix-run/react';
import { Book, GoogleBook } from 'client/client.schemas';
import { useAtom } from 'jotai';
import { userAtom } from '~/stores/userAtom';
import GlobalBookDetailControlButtons from '../global-book-detail/GlobalBookDetailControlButtons';
import BookDetailControlButtons from './BookDetailControlButtons';
import BookDetailThumbnail from './BookDetailThumbnail';

interface BookDetailActionPanelProps {
	book: Book | GoogleBook;
	totalBook?: number;
}

const BookDetailActionPanel = ({
	book,
	totalBook,
}: BookDetailActionPanelProps) => {
	const [user] = useAtom(userAtom);
	const location = useLocation();

	return (
		<Stack
			bg="var(--mantine-color-body)"
			align="stretch"
			justify="center"
			gap="md"
		>
			<BookDetailThumbnail thumbnail={book.thumbnail} />
			{
				// prettier-ignore
				user && location.pathname.includes('global')
					? (
						<GlobalBookDetailControlButtons
							book={book as GoogleBook}
							totalBook={totalBook ?? 0}
						/>
					) : (
						<BookDetailControlButtons id={Number(book.id)} />
					)
			}
		</Stack>
	);
};

export default BookDetailActionPanel;
