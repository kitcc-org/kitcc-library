import { useOutletContext } from '@remix-run/react';
import { BookDetailOutletContext } from '../home.books.$bookId/route';
import BookDetailContent from '~/components/book-detail/BookDetailContent';

const BookDetailPage = () => {
	const { book, loansResponse } = useOutletContext<BookDetailOutletContext>();
	return <BookDetailContent book={book} loansResponse={loansResponse} />;
};

export default BookDetailPage;
