import { rem, Stack, Text } from '@mantine/core';

interface MyProfileDataComponentProps {
	name: string;
	email: string;
}

const MyProfileDataComponent = ({
	name,
	email,
}: MyProfileDataComponentProps) => {
	return (
		<Stack align="flex-start" justify="center" gap="0px">
			<Text size={rem(50)}>{name}</Text>
			<Text>{email}</Text>
		</Stack>
	);
};

export default MyProfileDataComponent;
