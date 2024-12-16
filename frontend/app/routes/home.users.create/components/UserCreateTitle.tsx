import { Center, Group, Title } from '@mantine/core';
import { RiUserAddFill } from 'react-icons/ri';

const UserCreateTitle = () => {
	return (
		<Center>
			<Group justify="center" align="center">
				<RiUserAddFill size="3.5ch" />
				<Title order={1}>ユーザー作成</Title>
			</Group>
		</Center>
	);
};

export default UserCreateTitle;
