import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MdDeleteForever } from 'react-icons/md';
import BookDetailDeleteModal from './BookDetailDeleteModal';

interface BookDetailDeleteButtonProps {
	bookId: number;
}

const BookDetailDeleteButton = ({ bookId }: BookDetailDeleteButtonProps) => {
	const [opened, { open, close }] = useDisclosure();

	return (
		<>
			<BookDetailDeleteModal bookId={bookId} disclosure={{ opened, close }} />
			<Button
				color="red"
				leftSection={<MdDeleteForever />}
				fz="lg"
				onClick={() => open()}
			>
				削除
			</Button>
		</>
	);
};

export default BookDetailDeleteButton;
