import { Container, Stack } from '@mantine/core';
import UsersListTitle from './UsersListTitle';
import ContentsHeader from '../common/pagination/ContentsHeader';
import type { PaginationProps } from '~/types/paginatiion';
import PaginationComponent from '../common/pagination/PaginationComponent';
import ErrorComponent from '../common/error/ErrorComponent';
import { getUsersResponse } from 'client/client';
import UsersListTable from './UsersListTable';
import UserAddButton from './UserAddButton';

interface UsersListComponentProps {
	paginationProps: PaginationProps;
	usersResponse: getUsersResponse;
	handleDeleteUserButtonClick: (id: number) => void;
}

const UsersListComponent = ({
	paginationProps,
	usersResponse,
	handleDeleteUserButtonClick,
}: UsersListComponentProps) => {
	return (
		<Container>
			<Stack
				bg="var(--mantine-color-body)"
				align="center"
				justify="center"
				maw="100%"
			>
				<UsersListTitle />
				<ContentsHeader
					page={paginationProps.page}
					limit={paginationProps.limit}
					total={paginationProps.totalNum}
					handleLimitChange={paginationProps.handleLimitChange}
				/>
				{usersResponse.status === 200 ? (
					<UsersListTable
						users={usersResponse.data.users}
						handleDeleteUserButtonClick={handleDeleteUserButtonClick}
					/>
				) : (
					<ErrorComponent message={'ユーザー情報を取得できませんでした。'} />
				)}
				<UserAddButton />
				<PaginationComponent
					totalNum={paginationProps.totalNum}
					page={paginationProps.page}
					limit={paginationProps.limit}
					handlePaginationChange={paginationProps.handlePaginationChange}
				/>
			</Stack>
		</Container>
	);
};

export default UsersListComponent;
