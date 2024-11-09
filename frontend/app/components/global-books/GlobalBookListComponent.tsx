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

export interface HandleGlobalSearchFunctions {
	handleDetailSubmit: (props: SearchBooksParams) => void;
	handleKeywordSubmit: (props: SearchBooksParams) => void;
}

interface HandlePaginationProps {
	handlePaginationChange: (newPage: number) => void;
	handleLimitChange: (newLimit: number) => void;
	page?: number;
	limit?: number;
	totalBook: number;
}

interface GlobalBookListComponentProps {
	booksResponse?: searchBooksResponse;
	form: UseFormReturnType<
		SearchBooksParams,
		(values: SearchBooksParams) => SearchBooksParams
	>;
	globalSearchFunctions: HandleGlobalSearchFunctions;
	paginationProps: HandlePaginationProps;
	isOpen: boolean;
	open: () => void;
	close: () => void;
	searchMode: string;
	setSearchMode: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalBookListComponent = ({
	booksResponse,
	form,
	globalSearchFunctions,
	isOpen,
	open,
	close,
	paginationProps,
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
				globalSearchFunctions={globalSearchFunctions}
				searchMode={searchMode}
				setSearchMode={setSearchMode}
			/>
			<ContentsHeader
				page={paginationProps.page}
				limit={paginationProps.limit}
				total={paginationProps.totalBook}
				handleLimitChange={paginationProps.handleLimitChange}
			/>
			{!booksResponse ? (
				<NoQueryComponent />
			) : booksResponse.status !== 200 ? (
				<ErrorComponent message={'書籍情報を取得できませんでした。'} />
			) : (
				<GlobalBookCards books={booksResponse.data.books} />
			)}
			<PaginationComponent
				totalNum={paginationProps.totalBook}
				page={paginationProps.page}
				limit={paginationProps.limit}
				handlePaginationChange={paginationProps.handlePaginationChange}
				color="teal"
			/>
		</Stack>
	);
};

export default GlobalBookListComponent;
