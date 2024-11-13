import { Center, Group, Title } from '@mantine/core';
import { FaShoppingCart } from 'react-icons/fa';

const CartTitle = () => {
	return (
		<Center>
			<Group justify="center" align="center">
				<FaShoppingCart size="3.5ch" />
				<Title order={1}>貸出カート</Title>
			</Group>
		</Center>
	);
};

export default CartTitle;
