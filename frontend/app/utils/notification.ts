import { notifications } from "@mantine/notifications"



export const successNotifications = (message: string) => {
  notifications.show({
    title: 'Success',
    message,
    color: 'teal',
  })
}

export const errorNotifications = (message: string) => {
  notifications.show({
    title: 'Error',
    message,
    color: 'red'
  })
}