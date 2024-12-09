import { Stack } from '@mantine/core';
import { SerializeFrom } from '@remix-run/cloudflare';
import { getUsersResponse } from 'client/client';
import type { PaginationProps } from '~/types/pagination';
import ErrorComponent from '../common/error/ErrorComponent';
import ContentsHeader from '../common/pagination/ContentsHeader';
import PaginationComponent from '../common/pagination/PaginationComponent';
import UserCreateButton from './UserCreateButton';
import UsersListTable from './UsersListTable';
import UsersListTitle from './UsersListTitle';

interface UsersListComponentProps {
	paginationProps: PaginationProps;
	usersResponse: SerializeFrom<getUsersResponse>;
}

const UsersListComponent = ({
	paginationProps,
	usersResponse,
}: UsersListComponentProps) => {
	return (
		<Stack bg="var(--mantine-color-body)" align="center" justify="flex-start">
			<UsersListTitle />
			<Stack w={{ base: '70%', md: '50%' }} align="stretch">
				<ContentsHeader
					page={paginationProps.page}
					limit={paginationProps.limit}
					total={paginationProps.total}
					handleLimitChange={paginationProps.handleLimitChange}
				/>
				{usersResponse.status === 200 ? (
					<UsersListTable users={usersResponse.data.users} />
				) : (
					<ErrorComponent message={'ユーザー情報を取得できませんでした。'} />
				)}
			</Stack>
			<UserCreateButton />
			<PaginationComponent
				total={paginationProps.total}
				page={paginationProps.page}
				limit={paginationProps.limit}
				handlePaginationChange={paginationProps.handlePaginationChange}
			/>
		</Stack>
	);
};

export default UsersListComponent;
