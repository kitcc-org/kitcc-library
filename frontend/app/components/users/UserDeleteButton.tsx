import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import UserDeleteModal from './UserDeleteModal';

interface UserDeleteButtonProps {
	id: number;
}

const UserDeleteButton = ({ id }: UserDeleteButtonProps) => {
	const [opened, { open, close }] = useDisclosure();

	return (
		<>
			<UserDeleteModal userId={id} disclosure={{ opened, close }} />
			<Button color="red" variant="light" bd="solid 2px" onClick={() => open()}>
				削除
			</Button>
		</>
	);
};

export default UserDeleteButton;
