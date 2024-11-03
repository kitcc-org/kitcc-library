import { Button } from '@mantine/core';
import { TbBookUpload } from 'react-icons/tb';

const BookDetailSubmitButton = () => {
	return (
		<Button type="submit" leftSection={<TbBookUpload />}>
			更新
		</Button>
	);
};

export default BookDetailSubmitButton;
