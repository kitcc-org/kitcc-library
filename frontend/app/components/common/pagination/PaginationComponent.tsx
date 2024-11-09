import { Center, Pagination } from '@mantine/core';

interface PaginationComponentProps {
	totalNum: number;
	page?: number;
	limit?: number;
	handlePaginationChange: (newPage: number) => void;
	color?: string;
}

const PaginationComponent = ({
	totalNum,
	page,
	limit,
	handlePaginationChange,
	color,
}: PaginationComponentProps) => {
	const limitNum = limit ?? 10;
	const totalPage = totalNum / limitNum + 1;
	return (
		<Center>
			<Pagination
				total={totalPage}
				value={page ?? 1}
				withEdges
				color={color ?? 'blue'}
				onChange={handlePaginationChange}
			/>
		</Center>
	);
};

export default PaginationComponent;
