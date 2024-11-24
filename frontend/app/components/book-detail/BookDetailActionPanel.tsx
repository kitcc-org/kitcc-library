import { Stack } from '@mantine/core';
import { useLocation } from '@remix-run/react';
import { SearchBooks200BooksItem } from 'client/client.schemas';
import { useAtom } from 'jotai';
import { userAtom } from '~/stores/userAtom';
import GlobalBookDetailControlButtons from '../global-book-detail/GlobalBookDetailControlButtons';
import BookDetailControlButtons from './BookDetailControlButtons';
import BookDetailThumbnail from './BookDetailThumbnail';

interface BookDetailActionPanelProps {
	id?: number;
	thumbnail?: string;
	searchBook?: SearchBooks200BooksItem;
	totalBook?: number;
}

const BookDetailActionPanel = ({
	id,
	thumbnail,
	searchBook,
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
			<BookDetailThumbnail thumbnail={thumbnail} />
			{user && location.pathname.includes('global')
				? searchBook &&
					typeof totalBook == 'number' && (
						<GlobalBookDetailControlButtons
							searchBook={searchBook}
							totalBook={totalBook}
						/>
					)
				: id && <BookDetailControlButtons id={id} />}
		</Stack>
	);
};

export default BookDetailActionPanel;
