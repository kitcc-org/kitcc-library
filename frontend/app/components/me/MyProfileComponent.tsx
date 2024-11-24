import {
	Avatar,
	Button,
	Center,
	Group,
	Paper,
	rem,
	Stack,
	Text,
	TextInput,
} from '@mantine/core';
import { useNavigate } from '@remix-run/react';
import { MdEdit } from 'react-icons/md';

interface MyProfileComponentProps {
	name: string;
	email: string;
}

const MyProfileComponent = ({ name, email }: MyProfileComponentProps) => {
	const navigate = useNavigate();

	return (
		<Center>
			<Paper shadow="xs" p="xl" withBorder w="50%" maw={rem(500)}>
				<Stack gap={rem(0)}>
					<Group justify="center" gap="0px">
						<Avatar variant="white" radius="sm" size={rem(100)} />
						<Text size={rem(30)}>{name}</Text>
					</Group>

					<Center>
						<TextInput
							w="90%"
							maw={rem(300)}
							label="メールアドレス"
							value={email}
							disabled
							styles={{
								input: {
									cursor: 'default',
									color: 'black',
									fontWeight: '500',
								},
							}}
						/>
					</Center>

					<Center>
						<Button
							leftSection={<MdEdit />}
							fz="lg"
							mt={rem(20)}
							miw={rem(200)}
							maw={rem(300)}
							onClick={() => navigate('/home/me/edit')}
						>
							編集
						</Button>
					</Center>
				</Stack>
			</Paper>
		</Center>
	);
};

export default MyProfileComponent;
