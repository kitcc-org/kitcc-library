import { Button } from '@mantine/core';
import { TbBookUpload } from 'react-icons/tb';

const BookDetailSubmitButton = () => {
	return (
		<Button type="submit" leftSection={<TbBookUpload />}>
			書籍の情報を更新する
		</Button>
	);
};

export default BookDetailSubmitButton;
