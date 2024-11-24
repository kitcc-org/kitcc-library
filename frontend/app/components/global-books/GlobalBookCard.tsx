import { Card } from '@mantine/core';
import type { SearchBooks200BooksItem } from 'client/client.schemas';
import BookCardThumbnail from '../books/BookCardThumbnail';

interface GlobalBookCardProps {
	book: SearchBooks200BooksItem;
}

const GlobalBookCard = ({ book }: GlobalBookCardProps) => {
	return (
		<Card shadow="sm" radius="md" pb="xs" withBorder>
			<Card.Section withBorder inheritPadding py="xs">
				<BookCardThumbnail
					// Google Books APIsでisbnのみの検索ができるまでコメントアウト
					// FIXME id={book.isbn ? Number(book.isbn) : undefined}
					thumbnail={book.thumbnail}
				/>
			</Card.Section>
		</Card>
	);
};

export default GlobalBookCard;
