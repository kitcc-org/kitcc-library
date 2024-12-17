import { Collapse, Space } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { SearchGoogleBooksParams } from 'client/client.schemas';
import FormLayout from '~/components/layouts/FormLayout';
import GlobalBookSearchKeywordForm from './search-form/GlobalBookSearchKeywordForm';
import GlobalBookSearchSubmitButton from './search-form/GlobalBookSearchSubmitButton';
import GlobalSearchSegment from './search-form/GlobalSearchSegment';

interface GlobalKeywordSearchFormProps {
	isOpen: boolean;
	form: UseFormReturnType<
		SearchGoogleBooksParams,
		(values: SearchGoogleBooksParams) => SearchGoogleBooksParams
	>;
	handleSubmit: (props: SearchGoogleBooksParams) => void;
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
			<FormLayout<SearchGoogleBooksParams>
				form={form}
				handleSubmit={handleSubmit}
			>
				<GlobalBookSearchKeywordForm form={form} />
				<GlobalBookSearchSubmitButton />
			</FormLayout>
		</Collapse>
	);
};

export default GlobalBookKeywordSearchForm;
