import { Anchor, Blockquote, Center } from '@mantine/core';
import { FaInfoCircle } from 'react-icons/fa';

interface NoCartComponentProps {
	color?: string;
}

const NoCartComponent = ({ color }: NoCartComponentProps) => {
	return (
		<Center h="70dh" w="100%">
			<Blockquote color={color ?? 'blue'} icon={<FaInfoCircle />} mt="xl">
				カートに本が入っていません。蔵書一覧は
				<Anchor href="/home">こちら</Anchor>から。
			</Blockquote>
		</Center>
	);
};

export default NoCartComponent;
