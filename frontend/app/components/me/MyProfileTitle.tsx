import { Center, Group, Title } from '@mantine/core';
import { PiUserListFill } from 'react-icons/pi';

const MyProfileTitle = () => {
	return (
		<Center>
			<Group justify="center" align="center">
				<PiUserListFill size="3.5ch" />
				<Title order={1}>マイプロフィール</Title>
			</Group>
		</Center>
	);
};

export default MyProfileTitle;
