import BookDetailEditButton from './BookDetailEditButton';
import { MdDeleteForever } from 'react-icons/md';
import { Button } from '@mantine/core';
import { useFetcher } from '@remix-run/react';
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
