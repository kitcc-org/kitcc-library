import { Card } from '@mantine/core';
import BookCardThumbnail from '~/components/books/BookCardThumbnail';
import { CartProps } from '~/stores/cartAtom';
import LoanCardHeader from './LoanCardHeader';

interface LoanCardProps {
	loan: CartProps;
}

const LoanCard = ({ loan }: LoanCardProps) => {
	return (
		<Card shadow="sm" radius="md" pb="xs" withBorder>
			<Card.Section withBorder inheritPadding>
				<LoanCardHeader id={loan.id} />
			</Card.Section>
			<Card.Section withBorder inheritPadding py="xs">
				<BookCardThumbnail book={loan} />
			</Card.Section>
		</Card>
	);
};

export default LoanCard;
