import { TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { SearchBooksParams } from 'client/client.schemas';

interface GlobalSearchTitleFormProps {
	form: UseFormReturnType<
		SearchBooksParams,
		(values: SearchBooksParams) => SearchBooksParams
	>;
}

const GlobalBookSearchTitleForm = ({ form }: GlobalSearchTitleFormProps) => {
	return (
		<TextInput
			label="タイトル"
			placeholder="Javaプログラミング徹底マスター"
			key={form.key('intitle')}
			{...form.getInputProps('intitle')}
		/>
	);
};

export default GlobalBookSearchTitleForm;
