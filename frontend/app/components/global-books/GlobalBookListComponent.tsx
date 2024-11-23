import { Stack } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { SerializeFrom } from '@remix-run/cloudflare';
import type { searchGoogleBooksResponse } from 'client/client';
import type { SearchGoogleBooksParams } from 'client/client.schemas';
import React from 'react';
import { AiOutlineGlobal } from 'react-icons/ai';
import { PaginationProps } from '~/types/pagination';
import BreadCrumbsComponent from '../common/breadcrumbs/BreadCrumbsComponent';
import ErrorComponent from '../common/error/ErrorComponent';
import ContentsHeader from '../common/pagination/ContentsHeader';
import PaginationComponent from '../common/pagination/PaginationComponent';
import GlobalBookCards from './GlobalBookCards';
import GlobalBookSearchComponent from './GlobalBookSearchComponent';
import NoQueryComponent from './NoQueryComponent';

export interface HandleGlobalSearchFunctions {
	handleDetailSubmit: (props: SearchGoogleBooksParams) => void;
	handleKeywordSubmit: (props: SearchGoogleBooksParams) => void;
}

interface GlobalBookListComponentProps {
	booksResponse?: SerializeFrom<searchGoogleBooksResponse>;
	form: UseFormReturnType<
		SearchGoogleBooksParams,
		(values: SearchGoogleBooksParams) => SearchGoogleBooksParams
	>;
	globalSearchFunctions: HandleGlobalSearchFunctions;
	paginationProps: PaginationProps;
	disclosure: {
		isOpen: boolean;
		open: () => void;
		close: () => void;
	};
	searchMode: string;
	setSearchMode: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalBookListComponent = ({
	booksResponse,
	form,
	globalSearchFunctions,
	disclosure: { isOpen, open, close },
	paginationProps,
	searchMode,
	setSearchMode,
}: GlobalBookListComponentProps) => {
	return (
		<Stack bg="var(--mantine-color-body)" align="stretch" justify="flex-start">
			<BreadCrumbsComponent
				anchors={[
					{
						icon: <AiOutlineGlobal />,
						title: 'グローバル検索',
						href: '/home/global',
					},
				]}
			/>
			<GlobalBookSearchComponent
				disclosure={{ isOpen, open, close }}
				form={form}
				globalSearchFunctions={globalSearchFunctions}
				searchMode={searchMode}
				setSearchMode={setSearchMode}
			/>
			<ContentsHeader
				page={paginationProps.page}
				limit={paginationProps.limit}
				total={paginationProps.total}
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
				total={paginationProps.total}
				page={paginationProps.page}
				limit={paginationProps.limit}
				handlePaginationChange={paginationProps.handlePaginationChange}
				color="teal"
			/>
		</Stack>
	);
};

export default GlobalBookListComponent;
