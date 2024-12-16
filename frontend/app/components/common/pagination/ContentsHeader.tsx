import { Group } from '@mantine/core';
import CurrentContentNumber from './CurrentContentNumber';
import LimitSelect from './LimitSelect';

interface ContentsHeaderProps {
	page?: number;
	limit?: number;
	total: number;
	handleLimitChange: (newLimit: number) => void;
}

const ContentsHeader = ({
	page = 1,
	limit = 10,
	total,
	handleLimitChange,
}: ContentsHeaderProps) => {
	const start = (page - 1) * limit + 1;
	const stop = page * limit;

	return (
		<Group justify="space-between">
			<CurrentContentNumber start={start} stop={stop} total={total} />
			<LimitSelect value={limit} handleLimitChange={handleLimitChange} />
		</Group>
	);
};

export default ContentsHeader;
