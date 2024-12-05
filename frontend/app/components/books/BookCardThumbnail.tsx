import { AspectRatio, Image, Overlay, rem } from '@mantine/core';
import { useLocation, useNavigate } from '@remix-run/react';
import { Book, GoogleBook } from 'client/client.schemas';
import NoImage from '~/img/noimage.png';

interface BookCardThumbnailProps {
	book: Book | GoogleBook;
}

const BookCardThumbnail = ({ book }: BookCardThumbnailProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const destination = location.pathname.includes('global')
		? `/home/global/books/${book.id}`
		: `/home/books/${book.id}`;

	return (
		<AspectRatio
			ratio={10 / 14}
			style={{
				flex: `0 0 ${rem(400)}`,
				cursor: book.isbn ? 'pointer' : undefined,
			}}
			component="div"
			onClick={() => book.isbn && navigate(destination)}
		>
			<Image src={book.thumbnail ? book.thumbnail : NoImage} alt="Book cover" />
			{!book.isbn && <Overlay color="gray" backgroundOpacity={0.5} />}
		</AspectRatio>
	);
};

export default BookCardThumbnail;
