import { Container, Stack } from '@mantine/core';
import UsersListTitle from './UsersListTitle';
import ContentsHeader from '../common/pagination/ContentsHeader';
import type { PaginationProps } from '~/types/paginatiion';
import PaginationComponent from '../common/pagination/PaginationComponent';
import ErrorComponent from '../common/error/ErrorComponent';
import { getUsersResponse } from 'client/client';
import UsersListTable from './UsersListTable';
import UserCreateButton from './UserCreateButton';
import BreadCrumbsComponent from '../common/breadcrumbs/BreadCrumbsComponent';

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
		<>
			<BreadCrumbsComponent
				anchors={[{ title: 'ユーザー一覧', href: '/home/users' }]}
			/>
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
		</>
	);
};

export default UsersListComponent;
