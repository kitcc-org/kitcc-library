import { TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { SearchBooksParams } from 'client/client.schemas';

interface GlobalSearchPublisherFormProps {
	form: UseFormReturnType<
		SearchBooksParams,
		(values: SearchBooksParams) => SearchBooksParams
	>;
}

const GlobalBookSearchPublisherForm = ({
	form,
}: GlobalSearchPublisherFormProps) => {
	return (
		<TextInput
			label="出版社"
			placeholder="SOFTBANK"
			key={form.key('inpublisher')}
			{...form.getInputProps('inpublisher')}
		/>
	);
};

export default GlobalBookSearchPublisherForm;
