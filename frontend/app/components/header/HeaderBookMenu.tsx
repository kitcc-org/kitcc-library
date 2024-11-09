import { Button, Menu } from '@mantine/core';
import { useNavigate } from '@remix-run/react';
import { FaBook } from 'react-icons/fa';
import { LuBookCopy } from 'react-icons/lu';
import { BiSolidBookAdd } from 'react-icons/bi';
import { userAtom } from '~/stores/userAtom';
import { useAtom } from 'jotai';

const HeaderBookMenu = () => {
	const navigate = useNavigate();
	return (
		<Menu shadow="md">
			<Menu.Target>
				<Button leftSection={<FaBook />} variant="default">
					書籍
				</Button>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item
					leftSection={<LuBookCopy />}
					onClick={() => navigate('/home')}
				>
					蔵書一覧
				</Menu.Item>
				<Menu.Item
					leftSection={<BiSolidBookAdd />}
					onClick={() => navigate('/home/global')}
				>
					グローバル検索
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

export default HeaderBookMenu;
