import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	redirect,
} from '@remix-run/cloudflare';
import { upsertLoans } from 'client/client';
import { UpsertLoansBodyItem } from 'client/client.schemas';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { commitSession, getSession } from '~/services/session.server';
import type { CartProps } from '~/stores/cartAtom';
import { selectedCartBooksAtom } from '~/stores/cartAtom';
import { makeCookieHeader } from '~/utils/session';
import CartListComponent from './components/CartListComponent';

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));
	if (!session) {
		return redirect('/login', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	}
	return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));

	// 未ログインの場合
	const userData = session.get('user');
	if (!userData) {
		return redirect('/login', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	}

	const cookieHeader = makeCookieHeader(session);

	const requestBody = await request.json<{ selectedCartBook: CartProps[] }>();
	const selectedCartBook = requestBody.selectedCartBook;
	const upsertBody: UpsertLoansBodyItem[] = selectedCartBook.map((book) => {
		return {
			bookId: book.id,
			userId: userData.id,
			volume: book.volume,
		};
	});

	const response = await upsertLoans(upsertBody, {
		headers: { Cookie: cookieHeader },
	});

	switch (response.status) {
		case 200:
			session.flash('success', '本を借りました');
			return redirect('/home', {
				headers: {
					'Set-Cookie': await commitSession(session),
				},
			});

		case 401:
			session.flash('error', 'ログインしてください');
			return redirect('/login', {
				headers: {
					'Set-Cookie': await commitSession(session),
				},
			});

		default:
			session.flash('error', '本を借りられませんでした');
			return redirect('/home/cart', {
				headers: {
					'Set-Cookie': await commitSession(session),
				},
			});
	}
};

const CartListPage = () => {
	const [, setSelectedCartBook] = useAtom(selectedCartBooksAtom);

	useEffect(() => setSelectedCartBook([]), []);

	return <CartListComponent />;
};

export default CartListPage;
