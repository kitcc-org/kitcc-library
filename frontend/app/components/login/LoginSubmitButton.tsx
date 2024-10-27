import { Button } from '@mantine/core';

interface LoginSubmitButtonProps {
	isPending: boolean;
}

const LoginSubmitButton = ({ isPending }: LoginSubmitButtonProps) => {
	return (
		<Button type="submit" disabled={isPending}>
			ログイン
		</Button>
	);
};

export default LoginSubmitButton;
