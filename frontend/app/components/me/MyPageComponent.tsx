import { Stack } from '@mantine/core';
import { getLoansResponse } from 'client/client';
import { User } from 'client/client.schemas';
import { PaginationProps } from '~/types/paginatiion';
import MyLoansListComponent from './MyLoansListComponent';
import MyProfileDataComponent from './MyProfileComponent';
import BreadCrumbsComponent from '../common/breadcrumbs/BreadCrumbsComponent';
import { FaUser } from 'react-icons/fa';

interface MyPageComponentProps {
	user: User;
	loansResponse: getLoansResponse;
	paginationProps: PaginationProps;
	handleReturnButtonClick: () => void;
}

const MyPageComponent = ({
	user,
	loansResponse,
	paginationProps,
	handleReturnButtonClick,
}: MyPageComponentProps) => {
	return (
		<Stack align="stretch" justify="center">
			<BreadCrumbsComponent
				anchors={[{ icon: <FaUser />, title: 'マイページ', href: '/home/me' }]}
			/>
			<MyProfileDataComponent name={user.name} email={user.email} />
			<MyLoansListComponent
				loansResponse={loansResponse}
				paginationProps={paginationProps}
				handleReturnButtonClick={handleReturnButtonClick}
			/>
		</Stack>
	);
};

export default MyPageComponent;
