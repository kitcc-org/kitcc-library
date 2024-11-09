import type { UseFormReturnType } from '@mantine/form';
import type { SearchBooksParams } from 'client/client.schemas';
import React from 'react';
import BookSearchModeButton from '../book-search/BookSearchModeButton';
import GlobalBookSearchModeButton from './GlobalBookSearchModeButton';
import GlobalSearchSegment from './GlobalSearchSegment';
import GlobalBookDetailSearchForm from './GlobalBookDetailSearchForm';
import GlobalBookKeywordSearchForm from './GlobalBookKeywordSearchForm';

interface GlobalBookSearchComponentProps {
	isOpen: boolean;
	open: () => void;
	close: () => void;
	form: UseFormReturnType<
		SearchBooksParams,
		(values: SearchBooksParams) => SearchBooksParams
	>;
	handleDetailSubmit: (props: SearchBooksParams) => void;
	handleKeywordSubmit: (props: SearchBooksParams) => void;
	searchMode: string;
	setSearchMode: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalBookSearchComponent = ({
	isOpen,
	open,
	close,
	form,
	handleDetailSubmit,
	handleKeywordSubmit,
	searchMode,
	setSearchMode,
}: GlobalBookSearchComponentProps) => {
	return (
		<>
			<GlobalBookSearchModeButton isOpen={isOpen} open={open} close={close} />
			<GlobalSearchSegment
				searchMode={searchMode}
				setSearchMode={setSearchMode}
			/>
			{searchMode === 'detail' ? (
				<GlobalBookDetailSearchForm
					isOpen={isOpen}
					form={form}
					handleSubmit={handleDetailSubmit}
				/>
			) : (
				<GlobalBookKeywordSearchForm
					isOpen={isOpen}
					form={form}
					handleSubmit={handleKeywordSubmit}
				/>
			)}
		</>
	);
};

export default GlobalBookSearchComponent;