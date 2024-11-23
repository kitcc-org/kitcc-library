import { Stack } from '@mantine/core';
import { SerializeFrom } from '@remix-run/cloudflare';
import { getLoansResponse } from 'client/client';
import { User } from 'client/client.schemas';
import { PaginationProps } from '~/types/pagination';
import MyLoansListComponent from './MyLoansListComponent';
import MyProfileDataComponent from './MyProfileComponent';
import BreadCrumbsComponent from '../common/breadcrumbs/BreadCrumbsComponent';

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
				anchors={[{ title: 'マイページ', href: '/home/me' }]}
			/>
			<MyProfileDataComponent name={user.name} email={user.email} />
			<MyLoansListComponent
				loansResponse={loansResponse}
				paginationProps={paginationProps}
			/>
		</Stack>
	);
};

export default MyPageComponent;
