import { Card } from '@mantine/core';
import type { SearchBooks200BooksItem } from 'client/client.schemas';
import { useAtom } from 'jotai';
import { userAtom } from '~/stores/userAtom';
import BookCardThumbnail from '../books/BookCardThumbnail';

interface GlobalBookCardProps {
	book: SearchBooks200BooksItem;
}

const GlobalBookCard = ({ book }: GlobalBookCardProps) => {
	const [user] = useAtom(userAtom);
	return (
		<Card shadow="sm" radius="md" pb="xs" withBorder>
			<Card.Section withBorder inheritPadding py="xs">
				<BookCardThumbnail id={book.isbn} thumbnail={book.thumbnail} />
			</Card.Section>
		</Card>
	);
};

export default GlobalBookCard;
