import { redirect, type MetaFunction } from '@remix-run/cloudflare';
import { Text } from '@mantine/core';

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' },
	];
};

export async function loader() {
	return redirect('home');
}
