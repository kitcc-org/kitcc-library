import FormLayout from '../layouts/FormLayout';
import { UseFormReturnType } from '@mantine/form';
import BookDetailTitleForm from './BookDetailTitleForm';
import BookDetailAuthorsForm from './BookDetailAuthorsForm';
import BookDetailPublisherForm from './BookDetailPublisherForm';
import BookDetailPublishedDateForm from './BookDetailPublishedDateForm';
import BookDetailIsbnForm from './BookDetailIsbnForm';
import BookDetailStockForm from './BookDetailStockForm';
import { CustomUpdateBookBody } from '~/routes/home.books.$bookId.edit/route';
import BookDetailEditTitle from './BookDetailEditTitle';
import BookDetailSubmitButton from './BookDetailSubmitButton';

interface BookDetailEditContentProps {
	form: UseFormReturnType<
		CustomUpdateBookBody,
		(values: CustomUpdateBookBody) => CustomUpdateBookBody
	>;
	handleSubmit: (props: CustomUpdateBookBody) => void;
}

const BookDetailEditContent = ({
	form,
	handleSubmit,
}: BookDetailEditContentProps) => {
	return (
		<FormLayout<CustomUpdateBookBody> form={form} handleSubmit={handleSubmit}>
			<BookDetailEditTitle />
			<BookDetailTitleForm form={form} />
			<BookDetailAuthorsForm form={form} />
			<BookDetailPublisherForm form={form} />
			<BookDetailPublishedDateForm form={form} />
			<BookDetailIsbnForm form={form} />
			<BookDetailStockForm form={form} />
			<BookDetailSubmitButton />
		</FormLayout>
	);
};

export default BookDetailEditContent;
