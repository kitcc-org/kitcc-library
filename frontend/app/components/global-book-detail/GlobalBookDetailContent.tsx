import { Stack } from '@mantine/core';
import { SearchBooks200BooksItem } from 'client/client.schemas';
import GlobalBookDetailContentTable from './GlobalBookDetailContentTable';
import BookDetailTitle from '../book-detail/BookDetailTitle';
import BookDetailDescription from '../book-detail/BookDetailDescription';
import GlobalBookDetailLink from './GlobalBookDetailLink';

interface GlobalBookDetailContentProps {
	book: SearchBooks200BooksItem;
	bookId?: number;
}

const GlobalBookDetailContent = ({
	book,
	bookId,
}: GlobalBookDetailContentProps) => {
	return (
		<Stack
			bg="var(--mantine-color-body)"
			align="stretch"
			justify="flex-start"
			gap="xl"
		>
			<BookDetailTitle title={book.title} />
			<GlobalBookDetailContentTable book={book} />
			<BookDetailDescription description={book.description ?? ''} />
			{!!bookId && <GlobalBookDetailLink bookId={bookId} />}
		</Stack>
	);
};

export default GlobalBookDetailContent;
