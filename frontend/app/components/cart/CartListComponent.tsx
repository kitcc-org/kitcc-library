import { Stack } from '@mantine/core';
import CartTitle from './CartTitle';
import CartCards from './CartCards';
import CartSelectedDialog from './CartSelectedDialog';
import { useAtom } from 'jotai';
import { cartAtom } from '~/stores/cartAtom';
import NoCartComponent from './NoCartComponent';

interface CartListComponentProps {
	handleLoanPatch: () => void;
}

const CartListComponent = ({ handleLoanPatch }: CartListComponentProps) => {
	const [cart] = useAtom(cartAtom);
	return (
		<Stack bg="var(--mantine-color-body)" align="stretch" justify="flex-start">
			<CartTitle />
			{cart.length == 0 ? (
				<NoCartComponent />
			) : (
				<>
					<CartCards />
					<CartSelectedDialog handleLoanPatch={handleLoanPatch} />
				</>
			)}
		</Stack>
	);
};

export default CartListComponent;
