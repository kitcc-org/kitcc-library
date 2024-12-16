import { Button } from '@mantine/core';
import { FaPen } from 'react-icons/fa';

const MyPageEditSubmitButton = () => {
	return (
		<Button type="submit" color="yellow" leftSection={<FaPen />}>
			更新
		</Button>
	);
};

export default MyPageEditSubmitButton;
