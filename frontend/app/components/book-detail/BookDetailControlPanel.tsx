import { Button, Stack } from '@mantine/core';
import { useFetcher, useNavigate } from '@remix-run/react';
import { useAtom } from 'jotai';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { userAtom } from '~/stores/userAtom';
import BookDetailThumbnail from './BookDetailThumbnail';

interface BookDetailControlPanelProps {
	id: number;
	thumbnail?: string;
}

const BookDetailControlPanel = ({
	id,
	thumbnail,
}: BookDetailControlPanelProps) => {
	const [user] = useAtom(userAtom);
	const fetcher = useFetcher();
	const navigate = useNavigate();
	return (
		<Stack
			bg="var(--mantine-color-body)"
			align="stretch"
			justify="center"
			gap="md"
		>
			<BookDetailThumbnail thumbnail={thumbnail} />
			{!!user && (
				<Button
					leftSection={<MdEdit />}
					fz="lg"
					onClick={() => navigate('edit')}
				>
					編集
				</Button>
			)}
			{!!user && (
				<Button
					color="red"
					leftSection={<MdDeleteForever />}
					fz="lg"
					onClick={() =>
						fetcher.submit(
							{ bookId: id },
							{ action: '/home/books/$bookId', method: 'delete' },
						)
					}
					disabled={fetcher.state === 'submitting'}
				>
					削除
				</Button>
			)}
		</Stack>
	);
};

export default BookDetailControlPanel;
