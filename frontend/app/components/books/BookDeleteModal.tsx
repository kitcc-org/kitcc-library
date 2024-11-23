import { Button, Center, List, Modal, rem, Text } from '@mantine/core';
import { useSubmit } from '@remix-run/react';
import { useAtom } from 'jotai';
import { MdDeleteForever } from 'react-icons/md';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { selectedBooksAtom } from '~/stores/bookAtom';

interface BookDeleteModalProps {
	disclosure: {
		opened: boolean;
		close: () => void;
	};
}

const BookDeleteModal = ({
	disclosure: { opened, close },
}: BookDeleteModalProps) => {
	const [selectedBook, setSelectedBook] = useAtom(selectedBooksAtom);
	const submit = useSubmit();

	return (
		<Modal
			opened={opened}
			onClose={close}
			title="本当に削除しますか？"
			centered
		>
			{selectedBook.map((book) => (
				<List key={book.id}>
					<List.Item>
						<Text truncate="end">{book.title}</Text>
					</List.Item>
				</List>
			))}
			<Center mt={rem(10)}>
				<Button
					leftSection={<RiArrowGoBackLine />}
					color="gray"
					mr={rem(10)}
					onClick={close}
				>
					キャンセル
				</Button>
				<Button
					leftSection={<MdDeleteForever size={20} />}
					color="red"
					onClick={() => {
						submit(JSON.stringify({ selectedBook: selectedBook }), {
							action: '/home?index',
							method: 'DELETE',
							encType: 'application/json',
						});

						setSelectedBook([]);
						close();
					}}
				>
					削除する
				</Button>
			</Center>
		</Modal>
	);
};

export default BookDeleteModal;
