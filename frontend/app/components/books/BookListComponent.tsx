import { Stack } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { getBooksResponse } from 'client/client';
import type { GetBooksParams } from 'client/client.schemas';
import BookSearchComponent from '../book-search/BookSearchComponent';
import ErrorComponent from '../common/error/ErrorComponent';
import ContentsHeader from '../common/pagination/ContentsHeader';
import PaginationComponent from '../common/pagination/PaginationComponent';
import BookCards from './BookCards';
import { PaginationProps } from '~/types/paginatiion';
import BreadCrumbsComponent from '../common/breadcrumbs/BreadCrumbsComponent';

interface BookListComponentProps {
	booksResponse: getBooksResponse;
	form: UseFormReturnType<
		GetBooksParams,
		(values: GetBooksParams) => GetBooksParams
	>;
	handleSubmit: (props: GetBooksParams) => void;
	isOpen: boolean;
	open: () => void;
	close: () => void;
	paginationProps: PaginationProps;
}

const BookListComponent = ({
	booksResponse,
	form,
	handleSubmit,
	isOpen,
	open,
	close,
	paginationProps,
}: BookListComponentProps) => {
	return (
		<Stack bg="var(--mantine-color-body)" align="stretch" justify="flex-start">
			<BreadCrumbsComponent anchors={[{ title: '蔵書一覧', href: '/home' }]} />
			<BookSearchComponent
				isOpen={isOpen}
				open={open}
				close={close}
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
