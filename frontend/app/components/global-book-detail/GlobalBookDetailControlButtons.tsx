import { Button } from '@mantine/core';
import { useSubmit } from '@remix-run/react';
import { CreateBookBody, GoogleBook } from 'client/client.schemas';
import { BiSolidBookAdd } from 'react-icons/bi';

interface GlobalBookDetailControlButtonsProps {
	book: GoogleBook;
	totalBook: number;
}

const GlobalBookDetailControlButtons = ({
	book,
	totalBook,
}: GlobalBookDetailControlButtonsProps) => {
	const submit = useSubmit();

	const bookData: CreateBookBody = {
		authors: book.authors,
		description: book.description ?? '',
		isbn: book.isbn ?? '',
		publishedDate: book.publishedDate ?? '',
		publisher: book.publisher ?? '',
		stock: 1,
		thumbnail: book.thumbnail,
		title: book.title,
	};

	return (
		<Button
			variant="filled"
			fz="lg"
			color="teal"
			disabled={totalBook > 0}
			leftSection={<BiSolidBookAdd />}
			onClick={() => {
				submit(
					{ ...bookData },
					{
						action: '/home/global/books/$bookId',
						method: 'POST',
						encType: 'application/json',
					},
				);
			}}
		>
			{totalBook > 0 ? '追加済み' : '追加'}
		</Button>
	);
};

export default GlobalBookDetailControlButtons;
