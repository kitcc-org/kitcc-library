import BookDetailDeleteButton from './BookDetailDeleteButton';
import BookDetailEditButton from './BookDetailEditButton';

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
