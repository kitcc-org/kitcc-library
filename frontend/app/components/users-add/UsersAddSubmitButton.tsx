import { Button } from '@mantine/core';
import { RiUserAddFill } from 'react-icons/ri';

interface UsersAddSubmitButtonProps {
	copied: boolean;
}

const UsersAddSubmitButton = ({ copied }: UsersAddSubmitButtonProps) => {
	return (
		<Button
			type="submit"
			color="yellow"
			leftSection={<RiUserAddFill />}
			disabled={!copied}
		>
			{copied ? '作成' : 'パスワードを生成してください'}
		</Button>
	);
};

export default UsersAddSubmitButton;
