import { notifications } from '@mantine/notifications';

export const successNotification = (message: string) => {
	notifications.show({
		title: 'Success',
		message,
		color: 'teal',
	});
};

export const errorNotification = (message: string) => {
	notifications.show({
		title: 'Error',
		message,
		color: 'red',
	});
};
