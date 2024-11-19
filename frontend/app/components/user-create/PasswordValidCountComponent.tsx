import { Button } from '@mantine/core';
import PasswordValidProgress from './PasswordValidProgress';

interface PasswordValidCountComponentProps {
	counts: number;
}

const PasswordValidCountComponent = ({
	counts,
}: PasswordValidCountComponentProps) => {
	const fmtedCounts = counts.toString().padStart(2, ' ');
	return (
		<Button
			disabled
			leftSection={<PasswordValidProgress counts={counts} />}
		>{`パスワードの有効時間：${fmtedCounts}秒`}</Button>
	);
};

export default PasswordValidCountComponent;
