import { TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { SearchGoogleBooksParams } from 'client/client.schemas';

interface GlobalSearchKeywordFormProps {
	form: UseFormReturnType<
		SearchGoogleBooksParams,
		(values: SearchGoogleBooksParams) => SearchGoogleBooksParams
	>;
}

const GlobalBookSearchKeywordForm = ({
	form,
}: GlobalSearchKeywordFormProps) => {
	return (
		<TextInput key={form.key('keyword')} {...form.getInputProps('keyword')} />
	);
};

export default GlobalBookSearchKeywordForm;
