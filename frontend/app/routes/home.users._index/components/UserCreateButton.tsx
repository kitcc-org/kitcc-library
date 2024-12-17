import { Button } from '@mantine/core';
import { RiUserAddFill } from 'react-icons/ri';

const UserCreateButton = () => {
	return (
		<Button
			color="blue"
			variant="filled"
			radius="xl"
			leftSection={<RiUserAddFill size={18} />}
			component="a"
			href="users/create"
		>
			ユーザーを作成する
		</Button>
	);
};

export default UserCreateButton;
