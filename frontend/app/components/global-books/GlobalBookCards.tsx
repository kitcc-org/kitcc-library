import { SearchBooks200BooksItem } from 'client/client.schemas';
import React from 'react';
import { ScrollArea, SimpleGrid } from '@mantine/core';
import GlobalNoBookComponent from './GlobalNoBookComponent';
import GlobalBookCard from './GlobalBookCard';

interface GlobalBookCardsProps {
	books: SearchBooks200BooksItem[];
}

const GlobalBookCards = ({ books }: GlobalBookCardsProps) => {
	if (books.length === 0) {
		return <GlobalNoBookComponent />;
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
