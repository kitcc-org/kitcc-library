import { Blockquote, Center } from '@mantine/core';
import { useLocation } from '@remix-run/react';
import { FaInfoCircle } from 'react-icons/fa';

interface NoBookComponentProps {
	color?: string;
}

const NoBookComponent = ({ color }: NoBookComponentProps) => {
	const location = useLocation();
	return (
		<Center h="70dh" w="100%">
			<Blockquote color={color ?? 'blue'} icon={<FaInfoCircle />} mt="xl">
				本が見つかりませんでした。
			</Blockquote>
		</Center>
	);
};

export default NoBookComponent;
