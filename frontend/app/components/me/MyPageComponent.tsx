import { Stack } from '@mantine/core';
import React from 'react';
import MyProfileComponent from './MyProfileComponent';
import MyLoansListComponent from './MyLoansListComponent';
import { User } from 'client/client.schemas';
import { getLoansResponse } from 'client/client';
import { PaginationProps } from '~/types/paginatiion';
import MyProfileDataComponent from './MyProfileDataComponent';

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
