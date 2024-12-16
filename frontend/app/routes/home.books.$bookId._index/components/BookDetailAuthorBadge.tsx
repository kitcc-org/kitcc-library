import { Badge } from '@mantine/core';

interface BookDetailAuthorBadgeProps {
	name: string;
}

const BookDetailAuthorBadge = ({ name }: BookDetailAuthorBadgeProps) => {
	return (
		<Badge
			component="a"
			href={`/home?author=${name}`}
			style={{ cursor: 'pointer' }}
			variant="outline"
			size="lg"
			data-testid="author-badge"
		>
			{name}
		</Badge>
	);
};

export default BookDetailAuthorBadge;
