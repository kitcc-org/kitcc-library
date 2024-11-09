import { Button, Stack } from '@mantine/core';
import { useFetcher } from '@remix-run/react';
import { useAtom } from 'jotai';
import { MdDeleteForever } from 'react-icons/md';
import { userAtom } from '~/stores/userAtom';
import BookDetailEditButton from './BookDetailEditButton';
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

	return (
		<Stack
			bg="var(--mantine-color-body)"
			align="stretch"
			justify="center"
			gap="md"
		>
			<BookDetailThumbnail thumbnail={thumbnail} />
			{!!user && <BookDetailEditButton bookId={id} />}
			{!!user && (
				<Button
					color="red"
					leftSection={<MdDeleteForever />}
					fz="lg"
					onClick={() =>
						fetcher.submit(
							{ bookId: id },
							{ action: '/home/books/$bookId', method: 'DELETE' },
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
