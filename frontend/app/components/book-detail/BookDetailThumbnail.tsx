import { AspectRatio, Image, rem } from '@mantine/core';
import NoImage from '~/img/noimage.png';

interface BookDetailThumbnailProps {
	thumbnail?: string;
}

const BookDetailThumbnail = ({ thumbnail }: BookDetailThumbnailProps) => {
	return (
		<AspectRatio
			ratio={10 / 14}
			style={{ flex: `0 0 ${rem(400)}` }}
			component="div"
		>
			<Image src={thumbnail ? thumbnail : NoImage} alt="Book cover" />
		</AspectRatio>
	);
};

export default BookDetailThumbnail;
