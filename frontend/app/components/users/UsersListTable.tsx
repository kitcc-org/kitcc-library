import { rem, Table } from '@mantine/core';
import { GetUsers200UsersItem } from 'client/client.schemas';
import NoUserComponent from './NoUserComponent';
import UserDeleteButton from './UserDeleteButton';

interface UsersTableProps {
	users: GetUsers200UsersItem[];
}

const UsersListTable = ({ users }: UsersTableProps) => {
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
								<Table.Td fz="md">{user.name}</Table.Td>
								<Table.Td maw={rem(5)}>
									<UserDeleteButton id={user.id} />
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
