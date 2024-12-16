import { Blockquote, Center } from '@mantine/core';
import { FaInfoCircle } from 'react-icons/fa';

interface NoLoanComponentProps {
	color?: string;
}

const NoLoanComponent = ({ color }: NoLoanComponentProps) => {
	return (
		<Center h="70dh" w="100%">
			<Blockquote color={color ?? 'blue'} icon={<FaInfoCircle />} mt="xl">
				本を借りていません。
			</Blockquote>
		</Center>
	);
};

export default NoLoanComponent;
