import { Button } from '@mantine/core';
import { TbBookUpload } from 'react-icons/tb';

const BookDetailSubmitButton = () => {
	return (
		<Button type="submit" leftSection={<TbBookUpload />} fz="lg">
			更新
		</Button>
	);
};

export default BookDetailSubmitButton;
