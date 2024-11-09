import { Collapse } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { SearchBooksParams } from 'client/client.schemas';
import FormLayout from '../layouts/FormLayout';
import GlobalBookSearchTitleForm from './GlobalBookSearchTitleForm';
import GlobalBookSearchAuthorForm from './GLobalBookSearchAuthorForm';
import GlobalBookSearchPublisherForm from './GlobalBookSearchPublisherForm';
import GlobalBookSearchIsbnForm from './GlobalBookSearchIsbnForm';
import GlobalBookSearchSubmitButton from './GlobalBookSearchSubmitButton';
import GlobalBookSearchKeywordForm from './GlobalBookSearchKeywordForm';

interface GlobalKeywordSearchFormProps {
	isOpen: boolean;
	form: UseFormReturnType<
		SearchBooksParams,
		(values: SearchBooksParams) => SearchBooksParams
	>;
	handleSubmit: (props: SearchBooksParams) => void;
}

const GlobalBookKeywordSearchForm = ({
	isOpen,
	form,
	handleSubmit,
}: GlobalKeywordSearchFormProps) => {
	return (
		<Collapse in={isOpen}>
			<FormLayout<SearchBooksParams> form={form} handleSubmit={handleSubmit}>
				<GlobalBookSearchKeywordForm form={form} />
				<GlobalBookSearchSubmitButton />
			</FormLayout>
		</Collapse>
	);
};

export default GlobalBookKeywordSearchForm;
