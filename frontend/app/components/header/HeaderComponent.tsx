import { AppShell, Group } from '@mantine/core';
import { getUser } from 'client/client';
import { User } from 'client/client.schemas';
import { useAtom } from 'jotai';
import { userAtom } from '~/stores/userAtom';
import HeaderMainComponent from './HeaderMainComponent';
import HeaderTitleLogo from './HeaderTitleLogo';

const getCookieUserId = () => {
	if (typeof document === 'undefined') return undefined;
	return document.cookie
		.split('; ')
		.find((row) => row.startsWith('__Secure-user_id='))
		?.split('=')[1];
};

const HeaderComponent = () => {
	const [user, setUser] = useAtom(userAtom);
	const userId = getCookieUserId();
	if (userId) {
		if (!user) {
			// ユーザ情報を取得するAPIを呼び出す。
			getUser(userId).then((response) => {
				if (response.status === 200) {
					setUser(response.data as User);
				}
			});
		}
	}
	return (
		<AppShell.Header bg="theme.color">
			<Group h="100%" justify="space-between" ml={30} mr={30}>
				<HeaderTitleLogo />
				<HeaderMainComponent />
			</Group>
		</AppShell.Header>
	);
};

export default HeaderComponent;
