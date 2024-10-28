import { Button, Menu } from '@mantine/core';
import { FaUsers, FaUserFriends } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa6';
import { useNavigate } from '@remix-run/react';

const HeaderUsersMenu = () => {
	const navigate = useNavigate();
	return (
		<Menu shadow="md">
			<Menu.Target>
				<Button leftSection={<FaUserFriends />} variant="default">
					ユーザー
				</Button>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item
					leftSection={<FaUsers />}
					onClick={() => navigate('/home/users')}
				>
					ユーザー一覧
				</Menu.Item>
				<Menu.Item
					leftSection={<FaUserPlus />}
					onClick={() => navigate('/home/user-add')}
				>
					ユーザー追加
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

export default HeaderUsersMenu;
