import { Button } from '@mantine/core';
import { FaSearch } from 'react-icons/fa';

const GlobalBookSearchSubmitButton = () => {
	return (
		<Button type="submit" color="lime" leftSection={<FaSearch />} fz="lg">
			検索
		</Button>
	);
};

export default GlobalBookSearchSubmitButton;
