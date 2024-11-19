import { Button } from '@mantine/core';
import PasswordValidProgress from './PasswordValidProgress';

interface PasswordValidCountComponentProps {
	counts: number;
}

const PasswordValidCountComponent = ({
	counts,
}: PasswordValidCountComponentProps) => {
	return (
		<Button
			disabled
			leftSection={<PasswordValidProgress counts={counts} />}
		>{`パスワードの有効時間：${counts}秒`}</Button>
	);
};

export default PasswordValidCountComponent;
