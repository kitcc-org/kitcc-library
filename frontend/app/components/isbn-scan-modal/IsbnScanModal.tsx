import { Button, Group, Modal, Stack, Text, TextInput } from '@mantine/core';
import { useNavigate } from '@remix-run/react';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { errorNotification } from '~/utils/notification';
import BarcodeScanner from './BarcodeScanner';

interface IsbnScanModalProps {
	url: string;
	disclosure: {
		opened: boolean;
		close: () => void;
	};
}

const IsbnScanModal = ({
	url: url,
	disclosure: { opened, close },
}: IsbnScanModalProps) => {
	const [isbn, setIsbn] = useState('');
	const navigate = useNavigate();

	return (
		<Modal opened={opened} onClose={close} size="xl" centered>
			<Stack align="center">
				<Text size="lg">バーコードを中央付近に写してください</Text>
				<BarcodeScanner onScan={setIsbn} />
				<Group>
					<Text size="lg">読み取り結果:</Text>
					<TextInput size="md" value={isbn} />
					<Button
						leftSection={<FaSearch />}
						px={20}
						fz="lg"
						onClick={() => {
							if (isbn !== '') {
								close();
								navigate(`${url}?isbn=${isbn}`);
								setIsbn('');
							} else {
								errorNotification('ISBNを読み取ってください');
							}
						}}
					>
						検索
					</Button>
				</Group>
			</Stack>
		</Modal>
	);
};

export default IsbnScanModal;
