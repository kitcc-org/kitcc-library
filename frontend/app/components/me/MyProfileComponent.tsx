import { Stack } from '@mantine/core';
import React from 'react';
import MyProfileTitle from './MyProfileTitle';
import MyProfileDataComponent from './MyProfileDataComponent';

interface MyProfileComponentProps {
	name: string;
	email: string;
}

const MyProfileComponent = ({ name, email }: MyProfileComponentProps) => {
	return (
		<Stack align="center" justify="center">
			<MyProfileTitle />
			<MyProfileDataComponent name={name} email={email} />
		</Stack>
	);
};

export default MyProfileComponent;
