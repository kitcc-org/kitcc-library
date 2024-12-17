import { TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { GetBooksParams } from 'client/client.schemas';

interface SearchTitleFormProps {
	form: UseFormReturnType<
		GetBooksParams,
		(values: GetBooksParams) => GetBooksParams
	>;
}

const BookSearchTitleForm = ({ form }: SearchTitleFormProps) => {
	return (
		<TextInput
			label="タイトル"
			placeholder="Javaプログラミング徹底マスター"
			key={form.key('title')}
			aria-label="タイトル"
			{...form.getInputProps('title')}
		/>
	);
};

export default BookSearchTitleForm;
