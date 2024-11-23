import { Container, Stack } from '@mantine/core';
import { SerializeFrom } from '@remix-run/cloudflare';
import { getUsersResponse } from 'client/client';
import type { PaginationProps } from '~/types/paginatiion';
import ErrorComponent from '../common/error/ErrorComponent';
import ContentsHeader from '../common/pagination/ContentsHeader';
import PaginationComponent from '../common/pagination/PaginationComponent';
import UserCreateButton from './UserCreateButton';
import UsersListTable from './UsersListTable';
import UsersListTitle from './UsersListTitle';

interface UsersListComponentProps {
	paginationProps: PaginationProps;
	usersResponse: SerializeFrom<getUsersResponse>;
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
					total={paginationProps.total}
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
				<UserCreateButton />
				<PaginationComponent
					total={paginationProps.total}
					page={paginationProps.page}
					limit={paginationProps.limit}
					handlePaginationChange={paginationProps.handlePaginationChange}
				/>
			</Stack>
		</Container>
	);
};

export default UsersListComponent;
