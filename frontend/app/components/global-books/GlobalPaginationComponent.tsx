import { Center, Pagination } from '@mantine/core';
import React from 'react';

interface GlobalPaginationComponentProps {
	totalNum: number;
	page?: number;
	limit?: number;
	handlePaginationChange: (newPage: number) => void;
}

const GlobalPaginationComponent = ({
	totalNum,
	page,
	limit,
	handlePaginationChange,
}: GlobalPaginationComponentProps) => {
	const limitNum = limit ?? 10;
	const totalPage = totalNum / limitNum + 1;
	return (
		<Center>
			<Pagination
				total={totalPage}
				value={page ?? 1}
				withEdges
				color="teal"
				onChange={handlePaginationChange}
			/>
		</Center>
	);
};

export default GlobalPaginationComponent;
