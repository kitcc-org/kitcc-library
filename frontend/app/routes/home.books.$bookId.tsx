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
import { getSession } from '~/services/session.server';
import { errorNotifications, successNotifications } from '~/utils/notification';

interface Response {
	method: string;
	status: number;
}

interface LoaderProps {
	bookResponse: getBookResponse;
	loansResponse: getLoansResponse | undefined;
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));
	const bookId = params.bookId ?? '';
	const bookResponse = await getBook(bookId);
	if (session.has('__Secure-user_id')) {
		const cookieHeader = [
			`__Secure-user_id=${session.get('__Secure-user_id')}`,
			`__Secure-session_token=${session.get('__Secure-session_token')}`,
		].join('; ');
		const loansResponse = await getLoans(
			{ bookId: bookId },
			{ headers: { Cookie: cookieHeader } },
		);
		return json<LoaderProps>({
			bookResponse: bookResponse,
			loansResponse: loansResponse,
		});
	}
	return json<LoaderProps>({
		bookResponse: bookResponse,
		loansResponse: undefined,
	});
};

export const action = async ({ request }: ActionFunctionArgs) => {
	// delete: 本の削除
	const session = await getSession(request.headers.get('Cookie'));
	const cookieHeader = session.has('__Secure-user_id')
		? [
				`__Secure-user_id=${session.get('__Secure-user_id')}`,
				`__Secure-session_token=${session.get('__Secure-session_token')}`,
		  ].join('; ')
		: undefined;
	const formData = await request.formData();
	if (request.method === 'DELETE') {
		const bookId = String(formData.get('bookId'));
		const response = await deleteBook(bookId, {
			headers: { Cookie: cookieHeader ?? '' },
		});
		switch (response.status) {
			case 204:
				successNotifications('削除しました');
				return redirect('/home');
			case 401:
				errorNotifications('ログインしてください');
				return redirect('/auth/login');
			case 404:
				errorNotifications('書籍が見つかりませんでした');
				return redirect('/home');
			case 500:
				errorNotifications('サーバーエラーが発生しました');
				return json<Response>({ method: 'DELETE', status: 500 });
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
