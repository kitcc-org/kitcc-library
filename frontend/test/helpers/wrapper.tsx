import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';

export const renderWithWrapper = (children: ReactElement) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				// データが古いと判断されるまでの時間[ms]
				staleTime: Infinity,
			},
		},
	});
	return {
		user: userEvent.setup(),
		...render(
			<QueryClientProvider client={queryClient}>
				<MantineProvider>
					<Notifications />
					{children}
				</MantineProvider>
			</QueryClientProvider>,
		),
	};
};
