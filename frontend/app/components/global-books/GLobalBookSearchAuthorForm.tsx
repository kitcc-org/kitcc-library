import { TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { SearchGoogleBooksParams } from 'client/client.schemas';

interface GlobalBookSearchAuthorFormProps {
	form: UseFormReturnType<
		SearchGoogleBooksParams,
		(values: SearchGoogleBooksParams) => SearchGoogleBooksParams
	>;
}

const GlobalBookSearchAuthorForm = ({
	form,
}: GlobalBookSearchAuthorFormProps) => {
	return (
		<TextInput
			label="著者"
			placeholder="竹岡尚三"
			key={form.key('inauthor')}
			{...form.getInputProps('inauthor')}
		/>
	);
};

export default GlobalBookSearchAuthorForm;
