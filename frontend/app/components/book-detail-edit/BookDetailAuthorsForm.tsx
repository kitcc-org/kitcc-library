import { TagsInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { CustomUpdateBookBody } from '~/routes/home.books.$bookId.edit/route';

interface BookDetailAuthorsFormProps {
	form: UseFormReturnType<
		CustomUpdateBookBody,
		(values: CustomUpdateBookBody) => CustomUpdateBookBody
	>;
}

const BookDetailAuthorsForm = ({ form }: BookDetailAuthorsFormProps) => {
	return (
		<TagsInput
			size="md"
			label="著者"
			placeholder="竹岡尚三"
			key={form.key('authors')}
			{...form.getInputProps('authors')}
		/>
	);
};

export default BookDetailAuthorsForm;
