import { Button, Center, Modal, rem } from '@mantine/core';
import { useSubmit } from '@remix-run/react';
import { MdDeleteForever } from 'react-icons/md';
import { RiArrowGoBackLine } from 'react-icons/ri';

interface UserDeleteModalProps {
	userId: number;
	disclosure: {
		opened: boolean;
		close: () => void;
	};
}

const UserDeleteModal = ({
	userId: userId,
	disclosure: { opened, close },
}: UserDeleteModalProps) => {
	const submit = useSubmit();

	return (
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
					leftSection={<MdDeleteForever size={20} />}
					color="red"
					onClick={() => {
						submit(
							{ userId: userId },
							{ action: '/home/users/?index', method: 'DELETE' },
						);
					}}
				>
					削除する
				</Button>
			</Center>
		</Modal>
	);
};

export default UserDeleteModal;
