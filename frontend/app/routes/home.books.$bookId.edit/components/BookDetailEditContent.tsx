import { UseFormReturnType } from '@mantine/form';
import FormLayout from '~/components/layouts/FormLayout';
import { CustomUpdateBookBody } from '~/routes/home.books.$bookId.edit/route';
import BookDetailAuthorsForm from './BookDetailAuthorsForm';
import BookDetailEditTitle from './BookDetailEditTitle';
import BookDetailIsbnForm from './BookDetailIsbnForm';
import BookDetailPublishedDateForm from './BookDetailPublishedDateForm';
import BookDetailPublisherForm from './BookDetailPublisherForm';
import BookDetailStockForm from './BookDetailStockForm';
import BookDetailSubmitButton from './BookDetailSubmitButton';
import BookDetailTitleForm from './BookDetailTitleForm';

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
