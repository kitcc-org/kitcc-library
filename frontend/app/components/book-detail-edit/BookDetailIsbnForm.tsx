import React from 'react';
import { UseFormReturnType } from '@mantine/form';
import { TextInput } from '@mantine/core';
import { CustomUpdateBookBody } from '~/routes/home.books.$bookId.edit/route';

interface BookDetailIsbnFormProps {
	form: UseFormReturnType<
		CustomUpdateBookBody,
		(values: CustomUpdateBookBody) => CustomUpdateBookBody
	>;
}

const BookDetailIsbnForm = ({ form }: BookDetailIsbnFormProps) => {
	return (
		<TextInput
			label="ISBN"
			placeholder="987654321098"
			key={form.key('isbn')}
			{...form.getInputProps('isbn')}
		/>
	);
};

export default BookDetailIsbnForm;
