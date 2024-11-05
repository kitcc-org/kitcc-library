import { DateInput } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import { CustomUpdateBookBody } from '~/routes/home.books.$bookId.edit/route';

interface BookDetailPublishedDateFormProps {
	form: UseFormReturnType<
		CustomUpdateBookBody,
		(values: CustomUpdateBookBody) => CustomUpdateBookBody
	>;
}

const BookDetailPublishedDateForm = ({
	form,
}: BookDetailPublishedDateFormProps) => {
	return (
		<DateInput
			size="md"
			label="出版日"
			placeholder="2000-01-31"
			valueFormat="YYYY-MM-DD"
			key={form.key('customPublishedDate')}
			{...form.getInputProps('customPublishedDate')}
		/>
	);
};

export default BookDetailPublishedDateForm;
