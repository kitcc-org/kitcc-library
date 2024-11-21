import { Button, Center, Modal, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MdDeleteForever } from 'react-icons/md';
import { RiArrowGoBackLine } from 'react-icons/ri';

interface UserDeleteButtonProps {
	id: number;
	handleDeleteUserButtonClick: (id: number) => void;
}

const UserDeleteButton = ({
	id,
	handleDeleteUserButtonClick,
}: UserDeleteButtonProps) => {
	const [opened, { open, close }] = useDisclosure();

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title="本当に削除しますか？"
				centered
			>
				<Center>
					<Button
						leftSection={<RiArrowGoBackLine />}
						color="gray"
						mr={rem(10)}
						onClick={close}
					>
						キャンセル
					</Button>
					<Button
						leftSection={<MdDeleteForever />}
						color="red"
						onClick={() => handleDeleteUserButtonClick(id)}
					>
						削除
					</Button>
				</Center>
			</Modal>
			<Button color="red" variant="light" bd="solid 2px" onClick={() => open()}>
				削除
			</Button>
		</>
	);
};

export default UserDeleteButton;
