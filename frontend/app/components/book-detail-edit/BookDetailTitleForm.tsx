import { TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { CustomUpdateBookBody } from '~/routes/home.books.$bookId.edit/route';

interface BookDetailTitleFormProps {
	form: UseFormReturnType<
		CustomUpdateBookBody,
		(values: CustomUpdateBookBody) => CustomUpdateBookBody
	>;
}

const BookDetailTitleForm = ({ form }: BookDetailTitleFormProps) => {
	return (
		<TextInput
			size="md"
			label="タイトル"
			placeholder="Javaプログラミング徹底マスター"
			key={form.key('title')}
			{...form.getInputProps('title')}
		/>
	);
};

export default BookDetailTitleForm;
