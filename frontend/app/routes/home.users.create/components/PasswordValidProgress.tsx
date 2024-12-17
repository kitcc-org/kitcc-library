import { RingProgress } from '@mantine/core';

interface PasswordValidProgressProps {
	counts: number;
}

const PasswordValidProgress = ({ counts }: PasswordValidProgressProps) => {
	return (
		<RingProgress
			size={30}
			thickness={5}
			transitionDuration={1000}
			sections={[{ value: Math.floor((counts / 30) * 100), color: 'gray' }]}
		/>
	);
};

export default PasswordValidProgress;
