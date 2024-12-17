import { Group, rem } from '@mantine/core';
import { Book } from 'client/client.schemas';
import { useAtom } from 'jotai';
import { userAtom } from '~/stores/userAtom';
import BookDetailTitle from './BookDetailTitle';

interface BookDetailHeaderProps {
	book: Book;
}

const BookDetailHeader = ({ book }: BookDetailHeaderProps) => {
	const [user] = useAtom(userAtom);

	return (
		<Group justify={user ? 'space-between' : 'flex-start'} py={10} px={rem(2)}>
			<BookDetailTitle title={book.title} />
			<div>s</div>
		</Group>
	);
};

export default BookDetailHeader;
