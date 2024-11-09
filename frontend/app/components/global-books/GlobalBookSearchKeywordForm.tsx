import { TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { SearchBooksParams } from 'client/client.schemas';

interface GlobalSearchKeywordFormProps {
	form: UseFormReturnType<
		SearchBooksParams,
		(values: SearchBooksParams) => SearchBooksParams
	>;
}

const GlobalBookSearchKeywordForm = ({
	form,
}: GlobalSearchKeywordFormProps) => {
	return (
		<TextInput
			label="キーワード"
			placeholder="Python"
			key={form.key('keyword')}
			{...form.getInputProps('keyword')}
		/>
	);
};

export default GlobalBookSearchKeywordForm;
