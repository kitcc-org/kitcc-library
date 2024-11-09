import { Collapse, Space } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { SearchBooksParams } from 'client/client.schemas';
import FormLayout from '../layouts/FormLayout';
import GlobalBookSearchSubmitButton from './GlobalBookSearchSubmitButton';
import GlobalBookSearchKeywordForm from './GlobalBookSearchKeywordForm';
import GlobalSearchSegment from './GlobalSearchSegment';

interface GlobalKeywordSearchFormProps {
	isOpen: boolean;
	form: UseFormReturnType<
		SearchBooksParams,
		(values: SearchBooksParams) => SearchBooksParams
	>;
	handleSubmit: (props: SearchBooksParams) => void;
	searchMode: string;
	setSearchMode: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalBookKeywordSearchForm = ({
	isOpen,
	form,
	handleSubmit,
	searchMode,
	setSearchMode,
}: GlobalKeywordSearchFormProps) => {
	return (
		<Collapse in={isOpen}>
			<GlobalSearchSegment
				searchMode={searchMode}
				setSearchMode={setSearchMode}
			/>
			<Space h="md" />
			<FormLayout<SearchBooksParams> form={form} handleSubmit={handleSubmit}>
				<GlobalBookSearchKeywordForm form={form} />
				<GlobalBookSearchSubmitButton />
			</FormLayout>
		</Collapse>
	);
};

export default GlobalBookKeywordSearchForm;
