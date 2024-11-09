import { Blockquote, Center } from '@mantine/core';
import { FaInfoCircle } from 'react-icons/fa';

const GlobalNoBookComponent = () => {
	return (
		<Center h="70dh" w="100%">
			<Blockquote color="teal" icon={<FaInfoCircle />} mt="xl">
				本が見つかりませんでした。
			</Blockquote>
		</Center>
	);
};

export default GlobalNoBookComponent;
