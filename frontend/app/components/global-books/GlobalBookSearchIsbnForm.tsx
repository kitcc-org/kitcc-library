import { TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { SearchGoogleBooksParams } from 'client/client.schemas';

interface GlobalSearchIsbnFormProps {
	form: UseFormReturnType<
		SearchGoogleBooksParams,
		(values: SearchGoogleBooksParams) => SearchGoogleBooksParams
	>;
}

const GlobalBookSearchIsbnForm = ({ form }: GlobalSearchIsbnFormProps) => {
	return (
		<TextInput
			label="ISBN"
			placeholder="10桁または13桁のISBN"
			key={form.key('isbn')}
			{...form.getInputProps('isbn')}
		/>
	);
};

export default GlobalBookSearchIsbnForm;
