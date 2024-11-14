import { Button } from '@mantine/core';

interface UserDeleteButtonProps {
	id: number;
	handleDeleteUserButtonClick: (id: number) => void;
}

const UserDeleteButton = ({
	id,
	handleDeleteUserButtonClick,
}: UserDeleteButtonProps) => {
	return (
		<Button
			color="red"
			variant="light"
			bd="solid 2px"
			onClick={() => handleDeleteUserButtonClick(id)}
		>
			削除
		</Button>
	);
};

export default UserDeleteButton;
