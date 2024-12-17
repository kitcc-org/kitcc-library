import { Button } from '@mantine/core';
import { RiUserAddFill } from 'react-icons/ri';

interface UserCreateSubmitButtonProps {
	copied: boolean;
}

const UserCreateSubmitButton = ({ copied }: UserCreateSubmitButtonProps) => {
	return (
		<Button
			type="submit"
			color="yellow"
			leftSection={<RiUserAddFill size={18} />}
			disabled={!copied}
		>
			{copied ? '作成' : 'パスワードを生成してください'}
		</Button>
	);
};

export default UserCreateSubmitButton;
