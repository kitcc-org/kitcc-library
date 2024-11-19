import { Card } from '@mantine/core';
import BookCardThumbnail from '../books/BookCardThumbnail';
import LoanCardHeader from './LoanCardHeader';

interface LoanCardProps {
	id: number;
	thumbnail?: string;
}

const LoanCard = ({ id, thumbnail }: LoanCardProps) => {
	return (
		<Card shadow="sm" radius="md" pb="xs" withBorder>
			<Card.Section withBorder inheritPadding>
				<LoanCardHeader id={id} />
			</Card.Section>
			<Card.Section withBorder inheritPadding py="xs">
				<BookCardThumbnail id={id} thumbnail={thumbnail} />
			</Card.Section>
		</Card>
	);
};

export default LoanCard;
