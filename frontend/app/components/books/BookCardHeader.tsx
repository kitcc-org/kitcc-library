import { Checkbox, Group } from '@mantine/core';
import { Book } from 'client/client.schemas';
import { useAtom } from 'jotai';
import { SelectedBookProps, selectedBooksAtom } from '~/stores/bookAtom';
import { userAtom } from '~/stores/userAtom';
import BookCardHeaderBadge from './BookCardHeaderBadge';

interface BookCardHeaderProps {
	book: Book;
}

const BookCardHeader = ({ book }: BookCardHeaderProps) => {
	const [selectedBook, setSelectedBook] = useAtom(selectedBooksAtom);
	const [user] = useAtom(userAtom);
	//  選択されている本のIDと表示する本のIDを比較する関数
	const isSelected = (element: SelectedBookProps) => element.id === book.id;

	const switchBookSelect = () => {
		// チェックボックスの状態が変化した時に
		if (selectedBook.some(isSelected)) {
			// すでに選択されていた場合は選択を外す
			setSelectedBook(selectedBook.filter((element) => element.id !== book.id));
		} else {
			// 選択されていなかった場合は選択する
			setSelectedBook([
				...selectedBook,
				{
					id: book.id,
					title: book.title,
					stock: book.stock,
					thumbnail: book.thumbnail,
				},
			]);
		}
	};

	return (
		<Group justify={user ? 'space-between' : 'flex-end'} py={10}>
			{!!user && (
				<Checkbox
					value={book.id}
					checked={selectedBook.some(isSelected)}
					onChange={switchBookSelect}
				/>
			)}
			<BookCardHeaderBadge stock={book.stock} />
		</Group>
	);
};

export default BookCardHeader;
