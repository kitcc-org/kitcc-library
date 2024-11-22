import { Button, Center, Modal, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useFetcher } from '@remix-run/react';
import { MdDeleteForever } from 'react-icons/md';
import { RiArrowGoBackLine } from 'react-icons/ri';

interface BookDetailDeleteButtonProps {
	bookId: number;
}

const BookDetailDeleteButton = ({ bookId }: BookDetailDeleteButtonProps) => {
	const fetcher = useFetcher();
	const [opened, { open, close }] = useDisclosure();

	return (
		<>
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
						leftSection={<MdDeleteForever />}
						color="red"
						onClick={() =>
							fetcher.submit(
								{ bookId: bookId },
								{ action: '/home/books/$bookId', method: 'DELETE' },
							)
						}
						disabled={fetcher.state === 'submitting'}
					>
						削除する
					</Button>
				</Center>
			</Modal>
			<Button
				color="red"
				leftSection={<MdDeleteForever />}
				fz="lg"
				onClick={() => open()}
				disabled={fetcher.state === 'submitting'}
			>
				削除
			</Button>
		</>
	);
};

export default BookDetailDeleteButton;
