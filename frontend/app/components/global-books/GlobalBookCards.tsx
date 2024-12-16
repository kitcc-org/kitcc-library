import { ScrollArea, SimpleGrid } from '@mantine/core';
import { GoogleBook } from 'client/client.schemas';
import NoBookComponent from '~/routes/home._index/components/NoBookComponent';
import GlobalBookCard from './GlobalBookCard';

interface GlobalBookCardsProps {
	books: GoogleBook[];
}

const GlobalBookCards = ({ books }: GlobalBookCardsProps) => {
	if (books.length === 0) {
		return <NoBookComponent color="teal" />;
	}
	return (
		<ScrollArea h="70dh">
			<SimpleGrid
				type="container"
				cols={{
					base: 2,
					'500px': 3,
					'800px': 4,
					'1100px': 5,
					'1400px': 6,
					'1700px': 7,
				}}
				// 画面幅が300pxを超えた場合、カードの間をxlにする
				spacing={{ base: 10, '300px': 'xl' }}
			>
				{books.map((book) => (
					<GlobalBookCard key={book.id} book={book} />
				))}
			</SimpleGrid>
		</ScrollArea>
	);
};

export default GlobalBookCards;
