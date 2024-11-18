import { Center, Group, Text, Title } from '@mantine/core';
import React from 'react';
import { RiUserAddFill } from 'react-icons/ri';

const UsersAddTitle = () => {
	return (
		<Center>
			<Group justify="center" align="center">
				<RiUserAddFill size="3.5ch" />
				<Title order={1}>ユーザー作成</Title>
			</Group>
		</Center>
	);
};

export default UsersAddTitle;
