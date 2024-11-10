import React from 'react';
import BookDetailEditButton from './BookDetailEditButton';
import { MdDeleteForever } from 'react-icons/md';
import { Button } from '@mantine/core';
import { useFetcher } from '@remix-run/react';

interface BookDetailControlButtonsProps {
	id: number;
}

const BookDetailControlButtons = ({ id }: BookDetailControlButtonsProps) => {
	const fetcher = useFetcher();
	return (
		<>
			<BookDetailEditButton bookId={id} />
			<Button
				color="red"
				leftSection={<MdDeleteForever />}
				fz="lg"
				onClick={() =>
					fetcher.submit(
						{ bookId: id },
						{ action: '/home/books/$bookId', method: 'DELETE' },
					)
				}
				disabled={fetcher.state === 'submitting'}
			>
				削除
			</Button>
		</>
	);
};

export default BookDetailControlButtons;
