import { Grid, rem, Stack } from '@mantine/core';
import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	redirect,
} from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { createBook, getBooks, getGoogleBook } from 'client/client';
import { CreateBookBody, GoogleBook } from 'client/client.schemas';
import { AiOutlineGlobal } from 'react-icons/ai';
import { FaBookAtlas } from 'react-icons/fa6';
import BookDetailActionPanel from '~/components/book-detail/BookDetailActionPanel';
import BreadCrumbsComponent from '~/components/common/breadcrumbs/BreadCrumbsComponent';
import GlobalBookDetailContent from '~/components/global-book-detail/GlobalBookDetailContent';
import { commitSession, getSession } from '~/services/session.server';
import { ActionResponse } from '~/types/response';
import { makeCookieHeader } from '~/utils/session';

interface LoaderData {
	googleBook: GoogleBook;
	totalBook?: number;
	bookId?: number;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	// 書籍の情報を取得する
	const volumeId = params.volumeId ?? '';
	const { data: googleBook } = await getGoogleBook(volumeId);

	if (googleBook.isbn) {
		// 既に登録済みであるか確認する
		const { data: getBooksData } = await getBooks({ isbn: googleBook.isbn });
		if (getBooksData.totalBook > 0) {
			// 登録済みである場合
			return json<LoaderData>({
				googleBook: googleBook,
				totalBook: getBooksData.totalBook,
				bookId: getBooksData.books[0].id,
			});
		} else {
			// 未登録の場合
			return json<LoaderData>({
				googleBook: googleBook,
				totalBook: getBooksData.totalBook,
				bookId: undefined,
			});
		}
	} else {
		// ログイン済みでない場合
		// APIの呼び出す回数を減らすために蔵書の情報を取得しない
		return json<LoaderData>({
			googleBook: googleBook,
			totalBook: undefined,
			bookId: undefined,
		});
	}
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

	const cookieHeader = makeCookieHeader(session);
	const requestBody = await request.json<CreateBookBody>();

	const response = await createBook(requestBody, {
		headers: { Cookie: cookieHeader },
	});

	switch (response.status) {
		case 201:
			session.flash('success', '書籍を追加しました');
			return redirect('/home', {
				headers: { 'Set-Cookie': await commitSession(session) },
			});

		case 400:
			session.flash('error', 'リクエストの中身が誤っています');
			return json<ActionResponse>(
				{ method: 'POST', status: response.status },
				{ headers: { 'Set-Cookie': await commitSession(session) } },
			);

		case 401:
			session.flash('error', 'ログインしてください');
			return redirect('/login', {
				headers: {
					'Set-Cookie': await commitSession(session),
				},
			});
	}
};

const GlobalBookDetailPage = () => {
	const { googleBook, totalBook, bookId } = useLoaderData<LoaderData>();
	return (
		<>
			<BreadCrumbsComponent
				anchors={[
					{
						icon: <AiOutlineGlobal />,
						title: 'グローバル検索',
						href: '/home/global',
					},
					{
						icon: <FaBookAtlas />,
						title: googleBook.title,
						href: `/home/global/${googleBook.id}`,
					},
				]}
			/>
			<Stack
				bg="var(--mantine-color-body)"
				align="stretch"
				justify="flex-start"
			>
				<Grid gutter={rem(50)}>
					<Grid.Col span={3}>
						<BookDetailActionPanel book={googleBook} totalBook={totalBook} />
					</Grid.Col>
					<Grid.Col span={9}>
						<GlobalBookDetailContent book={googleBook} bookId={bookId} />
					</Grid.Col>
				</Grid>
			</Stack>
		</>
	);
};

export default GlobalBookDetailPage;
