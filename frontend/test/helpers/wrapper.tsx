import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement, ReactNode } from 'react';

const wrappper = ({ children }: { children: ReactNode }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				// データが古いと判断されるまでの時間[ms]
				staleTime: Infinity,
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider>
				<Notifications />
				{children}
			</MantineProvider>
		</QueryClientProvider>
	);
};

export const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>,
) => {
	return {
		user: userEvent.setup(),
		...render(ui, { wrapper: wrappper, ...options }),
	};
};
