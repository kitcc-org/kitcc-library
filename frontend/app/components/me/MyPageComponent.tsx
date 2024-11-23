import { Stack } from '@mantine/core';
import { SerializeFrom } from '@remix-run/cloudflare';
import { getLoansResponse } from 'client/client';
import { User } from 'client/client.schemas';
import { PaginationProps } from '~/types/pagination';
import MyLoansListComponent from './MyLoansListComponent';
import MyProfileDataComponent from './MyProfileComponent';

interface MyPageComponentProps {
	user: User;
	loansResponse: SerializeFrom<getLoansResponse>;
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
