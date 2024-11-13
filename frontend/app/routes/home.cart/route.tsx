import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	redirect,
} from '@remix-run/cloudflare';
import { useSubmit } from '@remix-run/react';
import { upsertLoans } from 'client/client';
import { UpsertLoansBodyItem } from 'client/client.schemas';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import CartListComponent from '~/components/cart/CartListComponent';
import { commitSession, getSession } from '~/services/session.server';
import { cartAtom, selectedCartBooksAtom } from '~/stores/cartAtom';
import type { CartProps } from '~/stores/cartAtom';
import { removeBooksFromCart } from '~/utils/cart';
import { errorNotification } from '~/utils/notification';

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
	const userId = session.get('userId');
	if (!userId) {
		return redirect('/login', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	}

	const cookieHeader = [
		`__Secure-user_id=${session.get('userId')};`,
		`__Secure-session_token=${session.get('sessionToken')}`,
	].join('; ');

	// prettier-ignore
	const requestBody = await request.json<{ selectedCartBook: CartProps[] }>();
	const selectedCartBook = requestBody.selectedCartBook;
	const upsertBody: UpsertLoansBodyItem[] = selectedCartBook.map((book) => {
		return {
			bookId: book.id,
			userId: Number(userId),
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
	const [selectedCartBook, setSelectedCartBook] = useAtom(
		selectedCartBooksAtom,
	);
	const [cart, setCart] = useAtom(cartAtom);
	const submit = useSubmit();

	useEffect(() => {
		// 選択中の書籍をリセットする
		setSelectedCartBook([]);
	}, []);

	// volumeがstockを超えていないかチェックする
	const checkStock = (element: CartProps) => element.stock < element.volume;

	const handleLoanPatch = () => {
		if (selectedCartBook.length > 0 && !selectedCartBook.some(checkStock)) {
			submit(JSON.stringify({ selectedCartBook: selectedCartBook }), {
				action: '/home/cart',
				method: 'PATCH',
				encType: 'application/json',
			});
			setCart(removeBooksFromCart(cart, selectedCartBook));
			setSelectedCartBook([]);
		} else {
			errorNotification('在庫が足りません');
		}
	};

	return <CartListComponent handleLoanPatch={handleLoanPatch} />;
};

export default CartListPage;
