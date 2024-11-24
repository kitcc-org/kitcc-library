import { Stack } from '@mantine/core';
import { useAtom } from 'jotai';
import { cartAtom } from '~/stores/cartAtom';
import CartCards from './CartCards';
import CartSelectedDialog from './CartSelectedDialog';
import CartTitle from './CartTitle';
import NoCartComponent from './NoCartComponent';

const CartListComponent = () => {
	const [cart] = useAtom(cartAtom);
	return (
		<Stack bg="var(--mantine-color-body)" align="stretch" justify="flex-start">
			<CartTitle />
			{cart.length == 0 ? (
				<NoCartComponent />
			) : (
				<>
					<CartCards />
					<CartSelectedDialog />
				</>
			)}
		</Stack>
	);
};

export default CartListComponent;
