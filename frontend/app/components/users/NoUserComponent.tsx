import { Anchor, Blockquote, Center } from '@mantine/core';
import { FaInfoCircle } from 'react-icons/fa';

interface NoUserComponentProps {
	color?: string;
}

const NoUserComponent = ({ color }: NoUserComponentProps) => {
	return (
		<Center h="70dh" w="100%">
			<Blockquote color={color ?? 'blue'} icon={<FaInfoCircle />} mt="xl">
				ユーザーが存在しません。
			</Blockquote>
		</Center>
	);
};

export default NoUserComponent;
