import { Group } from '@mantine/core';
import LimitSelect from './LimitSelect';
import CurrentContentNumber from './CurrentContentNumber';

interface ContentsHeaderProps {
	page?: number;
	limit?: number;
	total: number;
	handleLimitChange: (newLimit: number) => void;
}

const ContentsHeader = ({
	page,
	limit,
	total,
	handleLimitChange,
}: ContentsHeaderProps) => {
	const truePage = page ?? 1;
	const trueLimit = limit ?? 10;
	const start = (truePage - 1) * trueLimit + 1;
	const stop = truePage * trueLimit;

	return (
		<Group justify="space-between">
			<CurrentContentNumber start={start} stop={stop} total={total} />
			<LimitSelect value={limit} handleLimitChange={handleLimitChange} />
		</Group>
	);
};

export default ContentsHeader;
