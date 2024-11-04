import { TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { CustomUpdateBookBody } from '~/routes/home.books.$bookId.edit/route';

interface BookDetailPublisherFormProps {
	form: UseFormReturnType<
		CustomUpdateBookBody,
		(values: CustomUpdateBookBody) => CustomUpdateBookBody
	>;
}

const BookDetailPublisherForm = ({ form }: BookDetailPublisherFormProps) => {
	return (
		<TextInput
			size="md"
			label="出版社"
			placeholder="SOFTBANK"
			key={form.key('publisher')}
			{...form.getInputProps('publisher')}
		/>
	);
};

export default BookDetailPublisherForm;
