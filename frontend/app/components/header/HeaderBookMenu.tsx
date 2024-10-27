import { Button, Menu } from '@mantine/core';
import { useNavigate } from '@remix-run/react';
import { FaBook } from 'react-icons/fa';
import { LuBookCopy } from 'react-icons/lu';
import { BiSolidBookAdd } from 'react-icons/bi';
import { userAtom } from '~/stores/userAtom';
import { useAtom } from 'jotai';

const HeaderBookMenu = () => {
	const navigate = useNavigate();
	const [user] = useAtom(userAtom);
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
					書籍一覧
				</Menu.Item>
				{!!user && (
					<Menu.Item
						leftSection={<BiSolidBookAdd />}
						onClick={() => navigate('/home/books/new')}
					>
						書籍追加
					</Menu.Item>
				)}
			</Menu.Dropdown>
		</Menu>
	);
};

export default HeaderBookMenu;
