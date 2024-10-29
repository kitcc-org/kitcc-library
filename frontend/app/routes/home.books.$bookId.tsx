import type {
	ActionFunctionArgs,
	LoaderFunctionArgs,
} from '@remix-run/cloudflare';
import { json, redirect } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import {
	deleteBook,
	getBook,
	getBookResponse,
	getLoans,
	getLoansResponse,
} from 'client/client';
import BookDetailComponent from '~/components/book-detail/BookDetailComponent';
import { commitSession, getSession } from '~/services/session.server';

interface LoaderData {
	bookResponse: getBookResponse;
	loansResponse?: getLoansResponse;
}

interface ActionResponse {
	method: string;
	status: number;
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));

	// 書籍の情報を取得する
	const bookId = params.bookId ?? '';
	const bookResponse = await getBook(bookId);

	let loansResponse = undefined;
	// ログイン済みの場合は貸出履歴を取得する
	if (session.has('userId')) {
		loansResponse = await getLoans(
			{ bookId: bookId },
			{
				headers: {
					Cookie: [
						`__Secure-user_id=${session.get('userId')}`,
						`__Secure-session_token=${session.get('sessionToken')}`,
					].join('; '),
				},
			},
		);
	}

	return json<LoaderData>({
		bookResponse: bookResponse,
		loansResponse: loansResponse,
	});
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));

	// 未ログインの場合
	if (!session.has('userId')) {
		session.flash('loginError', 'ログインしてください');
		return redirect('/auth/login', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	}

	const cookieHeader = [
		`__Secure-user_id=${session.get('userId')};`,
		`__Secure-session_token=${session.get('sessionToken')}`,
	].join('; ');
	const formData = await request.formData();

	if (request.method === 'DELETE') {
		// 書籍の削除
		const bookId = String(formData.get('bookId'));
		const response = await deleteBook(bookId, {
			headers: { Cookie: cookieHeader },
		});
		switch (response.status) {
			case 204:
				session.flash('deleteBookSuccess', '削除しました');
				return redirect('/home', {
					headers: {
						'Set-Cookie': await commitSession(session),
					},
				});
			case 401:
				session.flash('loginError', 'ログインしてください');
				return redirect('/auth/login', {
					headers: {
						'Set-Cookie': await commitSession(session),
					},
				});
			case 404:
				session.flash('deleteBookError', '書籍が見つかりませんでした');
				return redirect('/home', {
					headers: {
						'Set-Cookie': await commitSession(session),
					},
				});
			case 500:
				session.flash('deleteBookError', 'サーバーエラーが発生しました');
				return json<ActionResponse>(
					{ method: 'DELETE', status: 500 },
					{
						headers: {
							'Set-Cookie': await commitSession(session),
						},
					},
				);
		}
	}

	return null;
};

const BookDetailPage = () => {
	const { bookResponse, loansResponse } = useLoaderData<typeof loader>();
	return (
		<BookDetailComponent
			bookResponse={bookResponse}
			loansResponse={loansResponse}
		/>
	);
};

export default BookDetailPage;
