import { Collapse } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { GetBooksParams } from 'client/client.schemas';
import FormLayout from '~/components/layouts/FormLayout';
import BookSearchAuthorForm from './BookSearchAuthorForm';
import BookSearchIsbnForm from './BookSearchIsbnForm';
import BookSearchPublisherForm from './BookSearchPublisherForm';
import BookSearchSubmitButton from './BookSearchSubmitButton';
import BookSearchTitleForm from './BookSearchTitleForm';

interface SearchFormProps {
	isOpen: boolean;
	form: UseFormReturnType<
		GetBooksParams,
		(values: GetBooksParams) => GetBooksParams
	>;
	handleSubmit: (props: GetBooksParams) => void;
}

const BookSearchForm = ({ isOpen, form, handleSubmit }: SearchFormProps) => {
	return (
		<Collapse in={isOpen}>
			<FormLayout<GetBooksParams> form={form} handleSubmit={handleSubmit}>
				<BookSearchTitleForm form={form} />
				<BookSearchAuthorForm form={form} />
				<BookSearchPublisherForm form={form} />
				<BookSearchIsbnForm form={form} />
				<BookSearchSubmitButton />
			</FormLayout>
		</Collapse>
	);
};

export default BookSearchForm;
