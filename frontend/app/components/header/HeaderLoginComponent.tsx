import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSubmit } from '@remix-run/react';
import { useLogout } from 'client/client';
import { useAtom } from 'jotai';
import { LuLogOut } from 'react-icons/lu';
import { userAtom } from '~/stores/userAtom';
import HeaderBookMenu from './HeaderBookMenu';
import HeaderUserMenu from './HeaderUserMenu';
import HeaderUsersMenu from './HeaderUsersMenu';

const HeaderLoginComponent = () => {
	const [, setUser] = useAtom(userAtom);
	const [opened, { open, close }] = useDisclosure();
	const logoutTask = useLogout();
	const submit = useSubmit();

	const handleSubmit = () => {
		// ユーザの状態変数を削除する
		setUser(undefined);
		// モーダルを閉じる
		close();
		// ログアウトのactionを呼び出す
		submit({}, { method: 'DELETE', action: '/home' });
	};

	return (
		<>
			<Group>
				<HeaderBookMenu />
				<HeaderUsersMenu />
				<HeaderUserMenu open={open} />
			</Group>
			<Modal opened={opened && !logoutTask.isPending} onClose={close}>
				<Stack align="stretch" justify="center" gap="lg">
					<Text ta="center" size="xl">
						ログアウトしますか？
					</Text>
					<Group justify="center" grow>
						<Button onClick={close} variant="light">
							キャンセル
						</Button>
						<Button onClick={handleSubmit} leftSection={<LuLogOut />}>
							ログアウト
						</Button>
					</Group>
				</Stack>
			</Modal>
		</>
	);
};

export default HeaderLoginComponent;
