import { Stack } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { SerializeFrom } from '@remix-run/cloudflare';
import { getBooksResponse } from 'client/client';
import type { GetBooksParams } from 'client/client.schemas';
import { LuBookCopy } from 'react-icons/lu';
import BreadCrumbsComponent from '~/components/common/breadcrumbs/BreadCrumbsComponent';
import ErrorComponent from '~/components/common/error/ErrorComponent';
import ContentsHeader from '~/components/common/pagination/ContentsHeader';
import PaginationComponent from '~/components/common/pagination/PaginationComponent';
import { PaginationProps } from '~/types/pagination';
import BookCards from './BookCards';
import BookSearchComponent from './search-form/BookSearchComponent';

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
			<BreadCrumbsComponent
				anchors={[{ icon: <LuBookCopy />, title: '蔵書一覧', href: '/home' }]}
			/>
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
