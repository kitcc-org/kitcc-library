import { Center, Group, Title } from '@mantine/core';
import { FaUserPen } from 'react-icons/fa6';

const MyPageEditTitle = () => {
	return (
		<Center>
			<Group justify="center" align="center">
				<FaUserPen size="3.5ch" />
				<Title order={1}>プロフィール更新</Title>
			</Group>
		</Center>
	);
};

export default MyPageEditTitle;
