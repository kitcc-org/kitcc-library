import { Stack } from '@mantine/core';
import { useAtom } from 'jotai';
import { userAtom } from '~/stores/userAtom';
import BookDetailThumbnail from './BookDetailThumbnail';
import BookDetailControlButtons from './BookDetailControlButtons';
import { useLocation } from '@remix-run/react';
import GlobalBookDetailControlButtons from '../global-book-detail/GlobalBookDetailControlButtons';
import { SearchBooks200BooksItem } from 'client/client.schemas';

interface BookDetailControlPanelProps {
	id?: number;
	thumbnail?: string;
	searchBook?: SearchBooks200BooksItem;
	totalBook?: number;
}

const BookDetailControlPanel = ({
	id,
	thumbnail,
	searchBook,
	totalBook,
}: BookDetailControlPanelProps) => {
	const [user] = useAtom(userAtom);
	const location = useLocation();

	return (
		<Stack
			bg="var(--mantine-color-body)"
			align="stretch"
			justify="center"
			gap="md"
		>
			<BookDetailThumbnail thumbnail={thumbnail} />
			{user && location.pathname.includes('global')
				? searchBook &&
					totalBook && (
						<GlobalBookDetailControlButtons
							searchBook={searchBook}
							totalBook={totalBook}
						/>
					)
				: id && <BookDetailControlButtons id={id} />}
		</Stack>
	);
};

export default BookDetailControlPanel;
