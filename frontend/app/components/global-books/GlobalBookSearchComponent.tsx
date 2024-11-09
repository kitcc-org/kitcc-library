import type { UseFormReturnType } from '@mantine/form';
import type { SearchBooksParams } from 'client/client.schemas';
import React from 'react';
import GlobalBookSearchModeButton from './GlobalBookSearchModeButton';
import GlobalBookDetailSearchForm from './GlobalBookDetailSearchForm';
import GlobalBookKeywordSearchForm from './GlobalBookKeywordSearchForm';
import { HandleGlobalSearchFunctions } from './GlobalBookListComponent';

interface GlobalBookSearchComponentProps {
	isOpen: boolean;
	open: () => void;
	close: () => void;
	form: UseFormReturnType<
		SearchBooksParams,
		(values: SearchBooksParams) => SearchBooksParams
	>;
	globalSearchFunctions: HandleGlobalSearchFunctions;
	searchMode: string;
	setSearchMode: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalBookSearchComponent = ({
	isOpen,
	open,
	close,
	form,
	globalSearchFunctions,
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
					handleSubmit={globalSearchFunctions.handleDetailSubmit}
					searchMode={searchMode}
					setSearchMode={setSearchMode}
				/>
			) : (
				<GlobalBookKeywordSearchForm
					isOpen={isOpen}
					form={form}
					handleSubmit={globalSearchFunctions.handleKeywordSubmit}
					searchMode={searchMode}
					setSearchMode={setSearchMode}
				/>
			)}
		</>
	);
};

export default GlobalBookSearchComponent;
