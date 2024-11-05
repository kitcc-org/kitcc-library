import { Button } from '@mantine/core';
import { FaSearch } from 'react-icons/fa';

const BookSearchSubmitButton = () => {
	return (
		<Button type="submit" leftSection={<FaSearch />} fz="lg">
			検索
		</Button>
	);
};

export default BookSearchSubmitButton;
