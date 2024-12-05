import { Collapse } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { SearchGoogleBooksParams } from 'client/client.schemas';
import FormLayout from '../layouts/FormLayout';
import GlobalBookSearchAuthorForm from './GLobalBookSearchAuthorForm';
import GlobalBookSearchIsbnForm from './GlobalBookSearchIsbnForm';
import GlobalBookSearchPublisherForm from './GlobalBookSearchPublisherForm';
import GlobalBookSearchSubmitButton from './GlobalBookSearchSubmitButton';
import GlobalBookSearchTitleForm from './GlobalBookSearchTitleForm';
import GlobalSearchSegment from './GlobalSearchSegment';

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
