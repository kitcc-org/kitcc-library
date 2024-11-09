import type { UseFormReturnType } from '@mantine/form';
import type { SearchBooksParams } from 'client/client.schemas';
import React from 'react';
import GlobalBookSearchModeButton from './GlobalBookSearchModeButton';
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
			{searchMode === 'detail' ? (
				<GlobalBookDetailSearchForm
					isOpen={isOpen}
					form={form}
					handleSubmit={handleDetailSubmit}
					searchMode={searchMode}
					setSearchMode={setSearchMode}
				/>
			) : (
				<GlobalBookKeywordSearchForm
					isOpen={isOpen}
					form={form}
					handleSubmit={handleKeywordSubmit}
					searchMode={searchMode}
					setSearchMode={setSearchMode}
				/>
			)}
		</>
	);
};

export default GlobalBookSearchComponent;
