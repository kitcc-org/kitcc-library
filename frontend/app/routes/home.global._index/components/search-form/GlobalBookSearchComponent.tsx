import type { UseFormReturnType } from '@mantine/form';
import type { SearchGoogleBooksParams } from 'client/client.schemas';
import React from 'react';
import GlobalBookDetailSearchForm from '../GlobalBookDetailSearchForm';
import GlobalBookKeywordSearchForm from '../GlobalBookKeywordSearchForm';
import { HandleGlobalSearchFunctions } from '../GlobalBookListComponent';
import GlobalBookSearchModeButton from './GlobalBookSearchModeButton';

interface GlobalBookSearchComponentProps {
	disclosure: {
		isOpen: boolean;
		open: () => void;
		close: () => void;
	};
	form: UseFormReturnType<
		SearchGoogleBooksParams,
		(values: SearchGoogleBooksParams) => SearchGoogleBooksParams
	>;
	globalSearchFunctions: HandleGlobalSearchFunctions;
	searchMode: string;
	setSearchMode: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalBookSearchComponent = ({
	disclosure: { isOpen, open, close },
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
