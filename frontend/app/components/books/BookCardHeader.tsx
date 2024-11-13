import { Checkbox, Group } from '@mantine/core';
import { useAtom } from 'jotai';
import { SelectedBookProps, selectedBooksAtom } from '~/stores/bookAtom';
import { userAtom } from '~/stores/userAtom';
import BookCardHeaderBadge from './BookCardHeaderBadge';

interface BookCardHeaderProps {
	id: number;
	stock: number;
	title: string;
	thumbnail?: string;
}

const BookCardHeader = ({
	id,
	stock,
	title,
	thumbnail,
}: BookCardHeaderProps) => {
	const [selectedBook, setSelectedBook] = useAtom(selectedBooksAtom);
	const [user] = useAtom(userAtom);
	//  選択されている本のIDと表示する本のIDを比較する関数
	const selectedCheck = (element: SelectedBookProps) => element.id === id;

	const selectedBookAdd = () => {
		// チェックボックスの状態が変化した時に
		if (selectedBook.some(selectedCheck)) {
			// すでに選択されていた場合は選択を外す
			setSelectedBook(selectedBook.filter((element) => element.id !== id));
		} else {
			// 選択されていなかった場合は選択する
			setSelectedBook([...selectedBook, { id, stock, thumbnail }]);
		}
	};

	return (
		<Group justify={user ? 'space-between' : 'flex-end'} py={10}>
			{!!user && (
				<Checkbox
					value={id}
					checked={selectedBook.some(selectedCheck)}
					onChange={selectedBookAdd}
				/>
			)}
			<BookCardHeaderBadge stock={stock} />
		</Group>
	);
};

export default BookCardHeader;
