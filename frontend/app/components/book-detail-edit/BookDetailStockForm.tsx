import { NumberInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { CustomUpdateBookBody } from '~/routes/home.books.$bookId.edit/route';

interface BookDetailStockFormProps {
	form: UseFormReturnType<
		CustomUpdateBookBody,
		(values: CustomUpdateBookBody) => CustomUpdateBookBody
	>;
}

const BookDetailStockForm = ({ form }: BookDetailStockFormProps) => {
	return (
		<NumberInput
			size="md"
			label="在庫数"
			placeholder="0"
			key={form.key('stock')}
			{...form.getInputProps('stock')}
		/>
	);
};

export default BookDetailStockForm;
