import { Button, Center, Modal, rem } from '@mantine/core';
import { useFetcher } from '@remix-run/react';
import { MdDeleteForever } from 'react-icons/md';
import { RiArrowGoBackLine } from 'react-icons/ri';

interface BookDetailDeleteModalProps {
	bookId: number;
	disclosure: {
		opened: boolean;
		close: () => void;
	};
}

const BookDetailDeleteModal = ({
	bookId: bookId,
	disclosure: { opened, close },
}: BookDetailDeleteModalProps) => {
	const fetcher = useFetcher();

	return (
		<Modal
			opened={opened}
			onClose={close}
			title="本当に削除しますか？"
			centered
		>
			<Center>
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
						fetcher.submit(
							{ bookId: bookId },
							{ action: '/home/books/$bookId', method: 'DELETE' },
						);
					}}
					disabled={fetcher.state === 'submitting'}
				>
					削除する
				</Button>
			</Center>
		</Modal>
	);
};

export default BookDetailDeleteModal;
