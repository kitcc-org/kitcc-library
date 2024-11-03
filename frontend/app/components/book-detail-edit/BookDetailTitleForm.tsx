import { UseFormReturnType } from '@mantine/form';
import { TextInput } from '@mantine/core';
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
			label="タイトル"
			placeholder="Javaプログラミング徹底マスター"
			key={form.key('title')}
			{...form.getInputProps('title')}
		/>
	);
};

export default BookDetailTitleForm;
