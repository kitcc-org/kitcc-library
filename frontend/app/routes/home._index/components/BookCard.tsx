import { Card } from '@mantine/core';
import type { Book } from 'client/client.schemas';
import { useAtom } from 'jotai';
import { userAtom } from '~/stores/userAtom';
import BookCardFooter from './BookCardFooter';
import BookCardHeader from './BookCardHeader';
import BookCardThumbnail from './BookCardThumbnail';

interface BookCardProps {
	book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
	const [user] = useAtom(userAtom);

	return (
		<Card shadow="sm" radius="md" pb="xs" withBorder>
			<Card.Section withBorder inheritPadding>
				<BookCardHeader book={book} />
			</Card.Section>
			<Card.Section withBorder inheritPadding py="xs">
				<BookCardThumbnail book={book} />
			</Card.Section>

			{!!user && <BookCardFooter book={book} />}
		</Card>
	);
};

export default BookCard;
