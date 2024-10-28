import { AppShell, Group } from '@mantine/core';
import HeaderMainComponent from './HeaderMainComponent';
import HeaderTitleLogo from './HeaderTitleLogo';

const HeaderComponent = () => {
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
