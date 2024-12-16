import { Button, Group, Text, TextInput, rem } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import type { SearchGoogleBooksParams } from 'client/client.schemas';
import { MdCameraAlt } from 'react-icons/md';
import IsbnScanModal from '~/components/isbn-scan-modal/IsbnScanModal';

interface GlobalSearchIsbnFormProps {
	form: UseFormReturnType<
		SearchGoogleBooksParams,
		(values: SearchGoogleBooksParams) => SearchGoogleBooksParams
	>;
}

const GlobalBookSearchIsbnForm = ({ form }: GlobalSearchIsbnFormProps) => {
	const [opened, { open, close }] = useDisclosure();

	return (
		<>
			<IsbnScanModal url="/home/global" disclosure={{ opened, close }} />
			<TextInput
				label={
					<Group>
						<Text>ISBN</Text>
						<Button variant="transparent" onClick={open}>
							<MdCameraAlt size={24} />
							<Text td="underline" ml={rem(5)}>
								バーコードを読み取る
							</Text>
						</Button>
					</Group>
				}
				placeholder="10桁または13桁のISBN"
				key={form.key('isbn')}
				{...form.getInputProps('isbn')}
			/>
		</>
	);
};

export default GlobalBookSearchIsbnForm;
