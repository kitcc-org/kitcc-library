import { TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { GetBooksParams } from 'client/client.schemas';

interface SearchPublisherFormProps {
	form: UseFormReturnType<
		GetBooksParams,
		(values: GetBooksParams) => GetBooksParams
	>;
}

const BookSearchPublisherForm = ({ form }: SearchPublisherFormProps) => {
	return (
		<TextInput
			label="出版社"
			placeholder="SOFTBANK"
			key={form.key('publisher')}
			{...form.getInputProps('publisher')}
		/>
	);
};

export default BookSearchPublisherForm;
