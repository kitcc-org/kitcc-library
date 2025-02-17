import { Stack } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';

interface FormLayoutProps<T> {
	form: UseFormReturnType<T, (values: T) => T>;
	handleSubmit: (props: T) => void;
	children: React.ReactNode;
}

const FormLayout = <T,>({
	form,
	handleSubmit,
	children,
}: FormLayoutProps<T>) => {
	return (
		<form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
			<Stack align="stretch" gap="md" justify="center">
				{children}
			</Stack>
		</form>
	);
};

export default FormLayout;
