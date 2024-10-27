import { Blockquote, Center } from '@mantine/core';
import { FaInfoCircle } from 'react-icons/fa';

const NoBookComponent = () => {
	return (
		<Center h="70dh" w="100%">
			<Blockquote color="blue" icon={<FaInfoCircle />} mt="xl">
				本が見つかりませんでした。
			</Blockquote>
		</Center>
	);
};

export default NoBookComponent;
