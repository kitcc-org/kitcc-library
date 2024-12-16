import { Button, Group, rem, Text, TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import type { GetBooksParams } from 'client/client.schemas';
import { MdCameraAlt } from 'react-icons/md';
import IsbnScanModal from '~/components/common/isbn-scan-modal/IsbnScanModal';

interface SearchIsbnFormProps {
	form: UseFormReturnType<
		GetBooksParams,
		(values: GetBooksParams) => GetBooksParams
	>;
}

const BookSearchIsbnForm = ({ form }: SearchIsbnFormProps) => {
	const [opened, { open, close }] = useDisclosure();

	return (
		<>
			<IsbnScanModal url="/home" disclosure={{ opened, close }} />
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
				aria-label="ISBN"
				{...form.getInputProps('isbn')}
			/>
		</>
	);
};

export default BookSearchIsbnForm;
