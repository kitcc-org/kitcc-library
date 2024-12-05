import { Stack } from '@mantine/core';
import { GoogleBook } from 'client/client.schemas';
import BookDetailDescription from '../book-detail/BookDetailDescription';
import BookDetailTitle from '../book-detail/BookDetailTitle';
import GlobalBookDetailContentTable from './GlobalBookDetailContentTable';
import GlobalBookDetailLink from './GlobalBookDetailLink';

interface GlobalBookDetailContentProps {
	book: GoogleBook;
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
