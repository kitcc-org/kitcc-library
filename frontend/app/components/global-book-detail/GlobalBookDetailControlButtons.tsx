import { Button } from '@mantine/core';
import { useSubmit } from '@remix-run/react';
import { CreateBookBody, SearchBooks200BooksItem } from 'client/client.schemas';
import { BiSolidBookAdd } from 'react-icons/bi';

interface GlobalBookDetailControlButtonsProps {
	searchBook: SearchBooks200BooksItem;
	totalBook: number;
}

const GlobalBookDetailControlButtons = ({
	searchBook,
	totalBook,
}: GlobalBookDetailControlButtonsProps) => {
	const submit = useSubmit();

	const addBookData: CreateBookBody = {
		authors: searchBook.authors,
		description: searchBook.description ?? '',
		isbn: searchBook.isbn ?? '',
		publishedDate: searchBook.publishedDate ?? '',
		publisher: searchBook.publisher ?? '',
		stock: 1,
		thumbnail: searchBook.thumbnail,
		title: searchBook.title,
	};

	return (
		<Button
			variant="filled"
			color="teal"
			disabled={totalBook > 0}
			leftSection={<BiSolidBookAdd />}
			onClick={() => {
				submit(
					{ ...addBookData },
					{
						action: '/home/global/books/$bookId',
						method: 'POST',
					},
				);
			}}
		>
			{totalBook > 0 ? '追加済み' : '追加'}
		</Button>
	);
};

export default GlobalBookDetailControlButtons;
