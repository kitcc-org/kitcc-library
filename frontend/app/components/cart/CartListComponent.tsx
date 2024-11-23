import { Stack } from '@mantine/core';
import CartTitle from './CartTitle';
import CartCards from './CartCards';
import CartSelectedDialog from './CartSelectedDialog';
import { useAtom } from 'jotai';
import { cartAtom } from '~/stores/cartAtom';
import NoCartComponent from './NoCartComponent';
import BreadCrumbsComponent from '../common/breadcrumbs/BreadCrumbsComponent';
import { FaUser } from 'react-icons/fa';
import { LuShoppingCart } from 'react-icons/lu';

interface CartListComponentProps {
	handleBorrowButtonClick: () => void;
}

const CartListComponent = ({
	handleBorrowButtonClick,
}: CartListComponentProps) => {
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
					<CartSelectedDialog
						handleBorrowButtonClick={handleBorrowButtonClick}
					/>
				</>
			)}
		</Stack>
	);
};

export default CartListComponent;
