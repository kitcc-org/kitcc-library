import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { Button } from '@mantine/core';
import { useFetcher } from '@remix-run/react';

interface BookDetailDeleteButtonProps {
	bookId: number;
}

const BookDetailDeleteButton = ({ bookId }: BookDetailDeleteButtonProps) => {
	const fetcher = useFetcher();
	return (
		<Button
			color="red"
			leftSection={<MdDeleteForever />}
			fz="lg"
			onClick={() =>
				fetcher.submit(
					{ bookId: bookId },
					{ action: '/home/books/$bookId', method: 'DELETE' },
				)
			}
			disabled={fetcher.state === 'submitting'}
		>
			削除
		</Button>
	);
};

export default BookDetailDeleteButton;
