import { Center, Group, Title } from '@mantine/core';
import { FaUsers } from 'react-icons/fa';

const UsersListTitle = () => {
	return (
		<Center>
			<Group justify="center" align="center">
				<FaUsers size="3.5ch" />
				<Title order={1}>ユーザー一覧</Title>
			</Group>
		</Center>
	);
};

export default UsersListTitle;
