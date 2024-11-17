import { TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { GetBooksParams } from 'client/client.schemas';

interface BookSearchAuthorFormProps {
	form: UseFormReturnType<
		GetBooksParams,
		(values: GetBooksParams) => GetBooksParams
	>;
}

const BookSearchAuthorForm = ({ form }: BookSearchAuthorFormProps) => {
	return (
		<TextInput
			label="著者"
			placeholder="竹岡尚三"
			key={form.key('author')}
			aria-label="著者"
			{...form.getInputProps('author')}
		/>
	);
};

export default BookSearchAuthorForm;
