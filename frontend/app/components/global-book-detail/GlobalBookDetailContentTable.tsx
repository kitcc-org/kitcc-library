import { Group, rem, Stack, Table, Text } from '@mantine/core';
import { SearchBooks200BooksItem } from 'client/client.schemas';
import GlobalBookDetailAuthorBadge from './GlobalBookDetailAuthorBadge';

interface GlobalBookDetailContentTableProps {
	book: SearchBooks200BooksItem;
}

const GlobalBookDetailContentTable = ({
	book,
}: GlobalBookDetailContentTableProps) => {
	return (
		<Stack gap="sm" align="stretch" justify="flex-start">
			<Text fz={rem(22)}>書籍情報</Text>
			<Table fz={rem(17)}>
				<Table.Tr key={'author'}>
					<Table.Th>著者</Table.Th>
					<Table.Td>
						<Group gap={rem(7)}>
							{book.authors.map((author, id) => (
								<GlobalBookDetailAuthorBadge key={id} name={author} />
							))}
						</Group>
					</Table.Td>
				</Table.Tr>
				<Table.Tr key={'publisher'}>
					<Table.Th>出版社</Table.Th>
					<Table.Td>{book.publisher}</Table.Td>
				</Table.Tr>
				<Table.Tr key={'publishedDate'}>
					<Table.Th>出版日</Table.Th>
					<Table.Td>{book.publishedDate}</Table.Td>
				</Table.Tr>
				<Table.Tr key={'isbn'}>
					<Table.Th>ISBN</Table.Th>
					<Table.Td>{book.isbn}</Table.Td>
				</Table.Tr>
			</Table>
		</Stack>
	);
};

export default GlobalBookDetailContentTable;
