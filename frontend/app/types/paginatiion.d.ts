export interface PaginationProps {
	handlePaginationChange: (newPage: number) => void;
	handleLimitChange: (newLimit: number) => void;
	page?: number;
	limit?: number;
	totalNum: number;
}
