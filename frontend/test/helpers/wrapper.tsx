import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider, SetStateAction, WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { ReactElement, ReactNode } from 'react';

type InitialValues = [
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	WritableAtom<unknown, [SetStateAction<any>], void>,
	unknown,
][];

const QueryTestProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				// データが古いと判断されるまでの時間[ms]
				staleTime: Infinity,
			},
		},
	});

	// prettier-ignore
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
};

const JotaiTestProvider = ({
	initialValues,
	children,
}: {
	initialValues: InitialValues;
	children: ReactNode;
}) => {
	const HydrateAtoms = ({
		initialValues,
		children,
	}: {
		initialValues: InitialValues;
		children: ReactNode;
	}) => {
		useHydrateAtoms(initialValues);
		return children;
	};

	return (
		<Provider>
			<HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
		</Provider>
	);
};

const MantineTestProvider = ({ children }: { children: ReactNode }) => {
	return (
		<MantineProvider>
			<Notifications />
			{children}
		</MantineProvider>
	);
};

export const customRender = (
	ui: ReactElement,
	options?: RenderOptions & { initialValues?: InitialValues },
) => {
	const { initialValues, ...renderOptions } = options ?? {};
	return {
		user: userEvent.setup(),
		// prettier-ignore
		...render(
			<JotaiTestProvider initialValues={initialValues ?? []}>
				<QueryTestProvider>
					<MantineTestProvider>
						{ui}
					</MantineTestProvider>
				</QueryTestProvider>
			</JotaiTestProvider>,
			renderOptions,
		),
	};
};
