import { Stack } from '@mantine/core';
import { useAtom } from 'jotai';
import { cartAtom } from '~/stores/cartAtom';
import CartCards from './CartCards';
import CartSelectedDialog from './CartSelectedDialog';
import CartTitle from './CartTitle';
import NoCartComponent from './NoCartComponent';
import BreadCrumbsComponent from '../common/breadcrumbs/BreadCrumbsComponent';
import { FaUser } from 'react-icons/fa';
import { LuShoppingCart } from 'react-icons/lu';

const CartListComponent = () => {
	const [cart] = useAtom(cartAtom);
	return (
		<Stack bg="var(--mantine-color-body)" align="stretch" justify="flex-start">
			<BreadCrumbsComponent
				anchors={[
					{ icon: <FaUser />, title: 'マイページ', href: '/home/me' },
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
