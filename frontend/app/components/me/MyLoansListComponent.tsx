import { Stack } from '@mantine/core';
import { SerializeFrom } from '@remix-run/cloudflare';
import { getLoansResponse } from 'client/client';
import { PaginationProps } from '~/types/pagination';
import ErrorComponent from '../common/error/ErrorComponent';
import ContentsHeader from '../common/pagination/ContentsHeader';
import PaginationComponent from '../common/pagination/PaginationComponent';
import LoanCards from './LoanCards';

interface MyLoansListComponentProps {
	loansResponse: SerializeFrom<getLoansResponse>;
	paginationProps: PaginationProps;
}

const MyLoansListComponent = ({
	loansResponse,
	paginationProps,
}: MyLoansListComponentProps) => {
	return (
		<Stack bg="var(--mantine-color-body)" align="stretch" justify="center">
			<ContentsHeader
				page={paginationProps.page}
				limit={paginationProps.limit}
				total={paginationProps.total}
				handleLimitChange={paginationProps.handleLimitChange}
			/>
			{loansResponse.status !== 200 ? (
				<ErrorComponent message={'貸出情報を取得できませんでした。'} />
			) : (
				<LoanCards />
			)}
			<PaginationComponent
				total={paginationProps.total}
				page={paginationProps.page}
				limit={paginationProps.limit}
				handlePaginationChange={paginationProps.handlePaginationChange}
			/>
		</Stack>
	);
};

export default MyLoansListComponent;
