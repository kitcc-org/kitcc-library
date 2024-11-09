import type { UseFormReturnType } from '@mantine/form';
import type { searchBooksResponse } from 'client/client';
import type { SearchBooksParams } from 'client/client.schemas';
import React from 'react';
import NoQueryComponent from './NoQueryComponent';
import { Stack } from '@mantine/core';
import ContentsHeader from '../common/pagination/ContentsHeader';
import ErrorComponent from '../common/error/ErrorComponent';
import GlobalBookCards from './GlobalBookCards';
import GlobalBookSearchComponent from './GlobalBookSearchComponent';
import PaginationComponent from '../common/pagination/PaginationComponent';

interface GlobalBookListComponentProps {
	booksResponse?: searchBooksResponse;
	form: UseFormReturnType<
		SearchBooksParams,
		(values: SearchBooksParams) => SearchBooksParams
	>;
	handleDetailSubmit: (props: SearchBooksParams) => void;
	handleKeywordSubmit: (props: SearchBooksParams) => void;
	isOpen: boolean;
	open: () => void;
	close: () => void;
	handlePaginationChange: (newPage: number) => void;
	handleLimitChange: (newLimit: number) => void;
	page?: number;
	limit?: number;
	totalBook: number;
	searchMode: string;
	setSearchMode: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalBookListComponent = ({
	booksResponse,
	form,
	handleDetailSubmit,
	handleKeywordSubmit,
	isOpen,
	open,
	close,
	handlePaginationChange,
	handleLimitChange,
	page,
	limit,
	totalBook,
	searchMode,
	setSearchMode,
}: GlobalBookListComponentProps) => {
	return (
		<Stack bg="var(--mantine-color-body)" align="stretch" justify="flex-start">
			<GlobalBookSearchComponent
				isOpen={isOpen}
				open={open}
				close={close}
				form={form}
				handleDetailSubmit={handleDetailSubmit}
				handleKeywordSubmit={handleKeywordSubmit}
				searchMode={searchMode}
				setSearchMode={setSearchMode}
			/>
			<ContentsHeader
				page={page}
				limit={limit}
				total={totalBook}
				handleLimitChange={handleLimitChange}
			/>
			{!booksResponse ? (
				<NoQueryComponent />
			) : booksResponse.status !== 200 ? (
				<ErrorComponent message={'書籍情報を取得できませんでした。'} />
			) : (
				<GlobalBookCards books={booksResponse.data.books} />
			)}
			<PaginationComponent
				totalNum={totalBook}
				page={page}
				limit={limit}
				handlePaginationChange={handlePaginationChange}
				color="teal"
			/>
		</Stack>
	);
};

export default GlobalBookListComponent;
