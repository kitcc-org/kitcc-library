import { Grid, rem, Stack } from '@mantine/core';
import type {
	ActionFunctionArgs,
	LoaderFunctionArgs,
} from '@remix-run/cloudflare';
import { json, redirect } from '@remix-run/cloudflare';
import { Outlet, useLoaderData, useLocation } from '@remix-run/react';
import type { getBookResponse, getLoansResponse } from 'client/client';
import { deleteBook, getBook, getLoans } from 'client/client';
import { commitSession, getSession } from '~/services/session.server';

import { Book } from 'client/client.schemas';
import BookDetailControlPanel from '~/components/book-detail/BookDetailControlPanel';
import ErrorComponent from '~/components/common/error/ErrorComponent';
import { ActionResponse } from '~/types/response';
import BreadCrumbsComponent from '~/components/common/breadcrumbs/BreadCrumbsComponent';
import { LuBookCopy } from 'react-icons/lu';
import { FaBook } from 'react-icons/fa6';
import { GiNotebook } from 'react-icons/gi';
import { TbBookUpload } from 'react-icons/tb';

interface LoaderData {
	bookResponse: getBookResponse;
	loansResponse?: getLoansResponse;
}

export interface BookDetailOutletContext {
	book: Book;
	loansResponse?: getLoansResponse;
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));

	// 書籍の情報を取得する
	const bookId = params.bookId ?? '';
	const bookResponse = await getBook(bookId);

	let loansResponse = undefined;
	// ログイン済みの場合は貸出履歴を取得する
	if (session.has('user')) {
		loansResponse = await getLoans(
			{ bookId: bookId },
			{
				headers: {
					Cookie: [
						`__Secure-user_id=${session.get('user')?.id}`,
						`__Secure-session_token=${session.get('user')?.sessionToken}`,
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
	if (!session.has('user')) {
		session.flash('error', 'ログインしてください');
		return redirect('/login', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	}

	const cookieHeader = [
		`__Secure-user_id=${session.get('user')?.id};`,
		`__Secure-session_token=${session.get('user')?.sessionToken}`,
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
				session.flash('success', '削除しました');
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
			case 404:
				session.flash('error', '書籍が見つかりませんでした');
				return redirect('/home', {
					headers: {
						'Set-Cookie': await commitSession(session),
					},
				});
			case 500:
				session.flash('error', 'サーバーエラーが発生しました');
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

const BookDetail = () => {
	const { bookResponse, loansResponse } = useLoaderData<typeof loader>();
	const location = useLocation();
	switch (bookResponse.status) {
		case 400:
			return <ErrorComponent message="リクエストが不正です" />;
		case 404:
			return <ErrorComponent message="書籍が見つかりませんでした" />;
		case 500:
			return <ErrorComponent message="サーバーエラーが発生しました" />;
	}
	return (
		<Stack bg="var(--mantine-color-body)" align="stretch" justify="flex-start">
			<BreadCrumbsComponent
				anchors={
					location.pathname.includes('/edit')
						? [
								{ icon: <LuBookCopy />, title: '蔵書一覧', href: '/home' },
								{
									icon: <FaBook />,
									title: bookResponse.data.title,
									href: `/home/books/${bookResponse.data.id}`,
								},
								{
									icon: <TbBookUpload />,
									title: '書籍更新',
									href: `/home/books/${bookResponse.data.id}/edit`,
								},
							]
						: [
								{ icon: <LuBookCopy />, title: '蔵書一覧', href: '/home' },
								{
									icon: <FaBook />,
									title: bookResponse.data.title,
									href: `/home/books/${bookResponse.data.id}`,
								},
							]
				}
			/>
			<Grid gutter={rem(50)}>
				<Grid.Col span={3}>
					<BookDetailControlPanel
						id={bookResponse.data.id}
						thumbnail={bookResponse.data.thumbnail}
					/>
				</Grid.Col>
				<Grid.Col span={9}>
					<Outlet
						context={{
							book: bookResponse.data,
							loansResponse: loansResponse,
						}}
					/>
				</Grid.Col>
			</Grid>
		</Stack>
	);
};

export default BookDetail;
