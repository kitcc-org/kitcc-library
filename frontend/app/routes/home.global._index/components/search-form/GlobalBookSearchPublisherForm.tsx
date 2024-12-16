import { TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { SearchGoogleBooksParams } from 'client/client.schemas';

interface GlobalSearchPublisherFormProps {
	form: UseFormReturnType<
		SearchGoogleBooksParams,
		(values: SearchGoogleBooksParams) => SearchGoogleBooksParams
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
