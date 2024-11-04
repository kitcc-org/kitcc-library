import { Text } from '@mantine/core';

interface CurrentContentNumberProps {
	start: number;
	stop: number;
	total: number;
}

const CurrentContentNumber = ({
	start,
	stop,
	total,
}: CurrentContentNumberProps) => {
	const trueStop = stop < total ? stop : total;
	return (
		<Text>
			{total > 1 ? `${start} ~ ${trueStop} 件` : `${total} 件`} (全 {total}件)
		</Text>
	);
};

export default CurrentContentNumber;
