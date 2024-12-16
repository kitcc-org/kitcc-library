import { Text } from '@mantine/core';
import parse from 'html-react-parser';

interface BookDetailDescriptionProps {
	description: string;
}

const BookDetailDescription = ({ description }: BookDetailDescriptionProps) => {
	return <Text fz={18}>{parse(description)}</Text>;
};

export default BookDetailDescription;
