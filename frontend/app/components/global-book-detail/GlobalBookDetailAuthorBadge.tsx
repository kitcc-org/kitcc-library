import { Badge } from '@mantine/core';

interface GlobalBookDetailAuthorBadgeProps {
	name: string;
}

const GlobalBookDetailAuthorBadge = ({
	name,
}: GlobalBookDetailAuthorBadgeProps) => {
	return (
		<Badge
			component="a"
			color="teal"
			href={`/home/global?author=${name}`}
			style={{ cursor: 'pointer' }}
			variant="outline"
			size="lg"
		>
			{name}
		</Badge>
	);
};

export default GlobalBookDetailAuthorBadge;
