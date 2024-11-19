import { Button } from '@mantine/core';
import { FaKey } from 'react-icons/fa';

interface PasswordGenerateButtonProps {
	handlePasswordGenButtonClick: () => void;
}

const PasswordGenerateButton = ({
	handlePasswordGenButtonClick,
}: PasswordGenerateButtonProps) => {
	return (
		<Button
			onClick={() => handlePasswordGenButtonClick()}
			leftSection={<FaKey />}
		>
			パスワードを生成する
		</Button>
	);
};

export default PasswordGenerateButton;
