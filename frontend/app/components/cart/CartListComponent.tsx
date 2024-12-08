import { Stack } from '@mantine/core';
import { useAtom } from 'jotai';
import { LuShoppingCart } from 'react-icons/lu';
import { cartAtom } from '~/stores/cartAtom';
import BreadCrumbsComponent from '../common/breadcrumbs/BreadCrumbsComponent';
import CartCards from './CartCards';
import CartSelectedDialog from './CartSelectedDialog';
import CartTitle from './CartTitle';
import NoCartComponent from './NoCartComponent';

const CartListComponent = () => {
	const [cart] = useAtom(cartAtom);
	return (
		<Stack bg="var(--mantine-color-body)" align="stretch" justify="flex-start">
			<BreadCrumbsComponent
				anchors={[
					{ icon: <LuShoppingCart />, title: '貸出カート', href: '/home/cart' },
				]}
			/>
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
