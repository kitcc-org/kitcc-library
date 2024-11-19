import { rem, Table } from '@mantine/core';
import { GetUsers200UsersItem } from 'client/client.schemas';
import UserDeleteButton from './UserDeleteButton';
import NoUserComponent from './NoUserComponent';

interface UsersTableProps {
	users: GetUsers200UsersItem[];
	handleDeleteUserButtonClick: (id: number) => void;
}

const UsersListTable = ({
	users,
	handleDeleteUserButtonClick,
}: UsersTableProps) => {
	if (users.length === 0) {
		return <NoUserComponent />;
	}
	return (
		<Table striped maw="50%">
			<Table.Tbody>
				{users.map((user) => (
					<Table.Tr key={user.id}>
						{user.id && (
							<>
								<Table.Td>{user.name}</Table.Td>
								<Table.Td maw={rem(5)}>
									<UserDeleteButton
										id={user.id}
										handleDeleteUserButtonClick={handleDeleteUserButtonClick}
									/>
								</Table.Td>
							</>
						)}
					</Table.Tr>
				))}
			</Table.Tbody>
		</Table>
	);
};

export default UsersListTable;
