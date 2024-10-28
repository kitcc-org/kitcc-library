import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Form, useSubmit } from '@remix-run/react';
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
		setUser(undefined);
		close();
		submit({}, { method: 'DELETE' });
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
						<Form action="/home" method="DELETE" onSubmit={handleSubmit}>
							<Button type="submit" fullWidth leftSection={<LuLogOut />}>
								ログアウト
							</Button>
						</Form>
					</Group>
				</Stack>
			</Modal>
		</>
	);
};

export default HeaderLoginComponent;
