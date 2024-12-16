import type { UseFormReturnType } from '@mantine/form';
import type { GetBooksParams } from 'client/client.schemas';
import BookSearchForm from './BookSearchForm';
import BookSearchModeButton from './BookSearchModeButton';

interface BookSearchComponentProps {
	disclosure: {
		isOpen: boolean;
		open: () => void;
		close: () => void;
	};
	form: UseFormReturnType<
		GetBooksParams,
		(values: GetBooksParams) => GetBooksParams
	>;
	handleSubmit: (props: GetBooksParams) => void;
}

const BookSearchComponent = ({
	disclosure: { isOpen, open, close },
	form,
	handleSubmit,
}: BookSearchComponentProps) => {
	return (
		<>
			<BookSearchModeButton isOpen={isOpen} open={open} close={close} />
			<BookSearchForm isOpen={isOpen} form={form} handleSubmit={handleSubmit} />
		</>
	);
};

export default BookSearchComponent;
