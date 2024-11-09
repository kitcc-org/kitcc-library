import { TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { SearchBooksParams } from 'client/client.schemas';

interface GlobalBookSearchAuthorFormProps {
	form: UseFormReturnType<
		SearchBooksParams,
		(values: SearchBooksParams) => SearchBooksParams
	>;
}

const GlobalBookSearchAuthorForm = ({
	form,
}: GlobalBookSearchAuthorFormProps) => {
	return (
		<TextInput
			label="筆者"
			placeholder="竹岡尚三"
			key={form.key('inauthor')}
			{...form.getInputProps('inauthor')}
		/>
	);
};

export default GlobalBookSearchAuthorForm;
