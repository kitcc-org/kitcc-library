import { Card } from '@mantine/core';
import type { GoogleBook } from 'client/client.schemas';
import BookCardThumbnail from '../books/BookCardThumbnail';

interface GlobalBookCardProps {
	book: GoogleBook;
}

const GlobalBookCard = ({ book }: GlobalBookCardProps) => {
	return (
		<Card shadow="sm" radius="md" pb="xs" withBorder>
			<Card.Section withBorder inheritPadding py="xs">
				<BookCardThumbnail book={book} />
			</Card.Section>
		</Card>
	);
};

export default GlobalBookCard;
