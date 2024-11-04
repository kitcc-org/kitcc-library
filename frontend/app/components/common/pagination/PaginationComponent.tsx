import { Center, Pagination } from '@mantine/core';

interface PaginationComponentProps {
	totalNum: number;
	page?: number;
	limit?: number;
	handlePaginationChange: (newPage: number) => void;
}

const PaginationComponent = ({
	totalNum,
	page,
	limit,
	handlePaginationChange,
}: PaginationComponentProps) => {
	const limitNum = limit ?? 10;
	const totalPage = totalNum / limitNum + 1;
	return (
		<Center>
			<Pagination
				total={totalPage}
				value={page ?? 1}
				withEdges
				onChange={handlePaginationChange}
			/>
		</Center>
	);
};

export default PaginationComponent;
