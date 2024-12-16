import { Button } from '@mantine/core';
import { FaSearch } from 'react-icons/fa';

const GlobalBookSearchSubmitButton = () => {
	return (
		<Button type="submit" color="teal" leftSection={<FaSearch />} fz="lg">
			検索
		</Button>
	);
};

export default GlobalBookSearchSubmitButton;
