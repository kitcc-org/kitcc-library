import { Stack } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { SerializeFrom } from '@remix-run/cloudflare';
import { getBooksResponse } from 'client/client';
import type { GetBooksParams } from 'client/client.schemas';
import { PaginationProps } from '~/types/pagination';
import BookSearchComponent from '../book-search/BookSearchComponent';
import ErrorComponent from '../common/error/ErrorComponent';
import ContentsHeader from '../common/pagination/ContentsHeader';
import PaginationComponent from '../common/pagination/PaginationComponent';
import BookCards from './BookCards';

interface BookListComponentProps {
	booksResponse: SerializeFrom<getBooksResponse>;
	form: UseFormReturnType<
		GetBooksParams,
		(values: GetBooksParams) => GetBooksParams
	>;
	handleSubmit: (props: GetBooksParams) => void;
	disclosure: {
		isOpen: boolean;
		open: () => void;
		close: () => void;
	};
	paginationProps: PaginationProps;
}

const BookListComponent = ({
	booksResponse,
	form,
	handleSubmit,
	disclosure: { isOpen, open, close },
	paginationProps,
}: BookListComponentProps) => {
	return (
		<Stack bg="var(--mantine-color-body)" align="stretch" justify="flex-start">
			<BookSearchComponent
				disclosure={{ isOpen, open, close }}
				form={form}
				handleSubmit={handleSubmit}
			/>
			<ContentsHeader
				page={paginationProps.page}
				limit={paginationProps.limit}
				total={paginationProps.total}
				handleLimitChange={paginationProps.handleLimitChange}
			/>
			{booksResponse.status !== 200 ? (
				<ErrorComponent message={'書籍情報を取得できませんでした。'} />
			) : (
				<BookCards books={booksResponse.data.books} />
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

export default BookListComponent;
