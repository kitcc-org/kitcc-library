import { Stack } from '@mantine/core';
import { SerializeFrom } from '@remix-run/cloudflare';
import { getLoansResponse } from 'client/client';
import { User } from 'client/client.schemas';
import { FaUser } from 'react-icons/fa';
import { PaginationProps } from '~/types/pagination';
import BreadCrumbsComponent from '../common/breadcrumbs/BreadCrumbsComponent';
import MyLoansListComponent from './MyLoansListComponent';
import MyProfileComponent from './MyProfileComponent';

interface MyPageComponentProps {
	user: User;
	loansResponse: SerializeFrom<getLoansResponse>;
	paginationProps: PaginationProps;
}

const MyPageComponent = ({
	user,
	loansResponse,
	paginationProps,
}: MyPageComponentProps) => {
	return (
		<Stack align="stretch" justify="center">
			<BreadCrumbsComponent
				anchors={[{ icon: <FaUser />, title: 'マイページ', href: '/home/me' }]}
			/>
			<MyProfileComponent name={user.name} email={user.email} />
			<MyLoansListComponent
				loansResponse={loansResponse}
				paginationProps={paginationProps}
			/>
		</Stack>
	);
};

export default MyPageComponent;
