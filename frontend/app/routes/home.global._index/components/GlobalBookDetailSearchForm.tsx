import { Collapse } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { SearchGoogleBooksParams } from 'client/client.schemas';
import FormLayout from '~/components/layouts/FormLayout';
import GlobalBookSearchAuthorForm from './search-form/GLobalBookSearchAuthorForm';
import GlobalBookSearchIsbnForm from './search-form/GlobalBookSearchIsbnForm';
import GlobalBookSearchPublisherForm from './search-form/GlobalBookSearchPublisherForm';
import GlobalBookSearchSubmitButton from './search-form/GlobalBookSearchSubmitButton';
import GlobalBookSearchTitleForm from './search-form/GlobalBookSearchTitleForm';
import GlobalSearchSegment from './search-form/GlobalSearchSegment';

interface GlobalDetailSearchFormProps {
	isOpen: boolean;
	form: UseFormReturnType<
		SearchGoogleBooksParams,
		(values: SearchGoogleBooksParams) => SearchGoogleBooksParams
	>;
	handleSubmit: (props: SearchGoogleBooksParams) => void;
	searchMode: string;
	setSearchMode: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalBookDetailSearchForm = ({
	isOpen,
	form,
	handleSubmit,
	searchMode,
	setSearchMode,
}: GlobalDetailSearchFormProps) => {
	return (
		<Collapse in={isOpen}>
			<GlobalSearchSegment
				searchMode={searchMode}
				setSearchMode={setSearchMode}
			/>
			<FormLayout<SearchGoogleBooksParams>
				form={form}
				handleSubmit={handleSubmit}
			>
				<GlobalBookSearchTitleForm form={form} />
				<GlobalBookSearchAuthorForm form={form} />
				<GlobalBookSearchPublisherForm form={form} />
				<GlobalBookSearchIsbnForm form={form} />
				<GlobalBookSearchSubmitButton />
			</FormLayout>
		</Collapse>
	);
};

export default GlobalBookDetailSearchForm;
