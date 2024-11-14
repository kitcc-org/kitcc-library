import BookDetailEditButton from './BookDetailEditButton';
import BookDetailDeleteButton from './BookDetailDeleteButton';

interface BookDetailControlButtonsProps {
	id: number;
}

const BookDetailControlButtons = ({ id }: BookDetailControlButtonsProps) => {
	return (
		<>
			<BookDetailEditButton bookId={id} />
			<BookDetailDeleteButton bookId={id} />
		</>
	);
};

export default BookDetailControlButtons;
