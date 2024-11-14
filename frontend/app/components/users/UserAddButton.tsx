import { Button } from '@mantine/core';
import { RiUserAddFill } from 'react-icons/ri';

const UserAddButton = () => {
	return (
		<Button
			color="blue"
			variant="filled"
			radius="xl"
			leftSection={<RiUserAddFill />}
			component="a"
			href="users/add"
		>
			ユーザー追加
		</Button>
	);
};

export default UserAddButton;
