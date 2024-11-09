import { AspectRatio, Image, Overlay, rem } from '@mantine/core';
import { useNavigate } from '@remix-run/react';
import NoImage from '~/img/noImage.png';

interface BookCardThumbnailProps {
	id?: number;
	thumbnail?: string;
}

const BookCardThumbnail = ({ id, thumbnail }: BookCardThumbnailProps) => {
	const navigate = useNavigate();
	return (
		<AspectRatio
			ratio={10 / 14}
			style={{ flex: `0 0 ${rem(400)}`, cursor: id ? 'pointer' : undefined }}
			component="div"
			onClick={() => id && navigate(`books/${id}`)}
		>
			<Image src={thumbnail ? thumbnail : NoImage} alt="Book cover" />
			{!id && <Overlay color="gray" backgroundOpacity={0.5} />}
		</AspectRatio>
	);
};

export default BookCardThumbnail;
