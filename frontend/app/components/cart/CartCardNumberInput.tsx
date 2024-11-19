import { Group, Select, Text } from '@mantine/core';
import { range } from '@mantine/hooks';

interface CartCardHeaderBadgeProps {
	id: number;
	stock: number;
	volume: number;
	handleChangeVolume: (id: number, value: number) => void;
}

const CartCardNumberInput = ({
	id,
	stock,
	volume,
	handleChangeVolume,
}: CartCardHeaderBadgeProps) => {
	const stockList = range(0, stock);
	const dataList = stock >= volume ? stockList : [...stockList, volume];
	const strList = dataList.map((data) => data.toString());

	const handleOnChange = (volume: string | null) => {
		if (!volume) {
			return;
		}
		const numVolume = Number(volume);
		handleChangeVolume(id, numVolume);
	};
	return (
		<Group justify="flex-end" w="70%">
			<Text>冊数</Text>
			<Select
				w="50%"
				data={strList}
				value={String(volume)}
				error={volume > stock}
				onChange={(value) => handleOnChange(value)}
			/>
		</Group>
	);
};

export default CartCardNumberInput;
