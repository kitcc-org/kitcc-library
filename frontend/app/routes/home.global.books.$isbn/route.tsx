import { Grid, rem, Stack } from '@mantine/core';
import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	redirect,
} from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import {
	createBook,
	getBooks,
	searchBooks,
	searchBooksResponse,
} from 'client/client';
import { CreateBookBody } from 'client/client.schemas';
import BookDetailActionPanel from '~/components/book-detail/BookDetailActionPanel';
import GlobalBookDetailContent from '~/components/global-book-detail/GlobalBookDetailContent';
import { commitSession, getSession } from '~/services/session.server';
import { ActionResponse } from '~/types/response';

interface LoaderData {
	searchBooksResponse: searchBooksResponse;
	totalBook?: number;
	bookId?: number;
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));
	// 書籍の情報を取得する
	const isbn = params.isbn ?? '';
	const searchBooksResponse = await searchBooks({ isbn: isbn });
	// 既に登録済みであるか確認するため
	if (session.has('user')) {
		const getBookResponse = await getBooks({ isbn: isbn });
		if (getBookResponse.data.totalBook > 0) {
			return json<LoaderData>({
				searchBooksResponse: searchBooksResponse,
				totalBook: getBookResponse.data.totalBook,
				bookId: getBookResponse.data.books[0].id,
			});
		} else {
			return json<LoaderData>({
				searchBooksResponse: searchBooksResponse,
				totalBook: getBookResponse.data.totalBook,
				bookId: undefined,
			});
		}
	} else {
		// ログイン済みでない場合は、APIを呼び出す回数を減らすために蔵書の情報を取得しない
		return json<LoaderData>({
			searchBooksResponse: searchBooksResponse,
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

	const cookieHeader = [
		`__Secure-user_id=${session.get('user')?.id};`,
		`__Secure-session_token=${session.get('user')?.sessionToken}`,
	].join('; ');

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
	const { searchBooksResponse, totalBook, bookId } =
		useLoaderData<LoaderData>();
	return (
		<Stack bg="var(--mantine-color-body)" align="stretch" justify="flex-start">
			<Grid gutter={rem(50)}>
				<Grid.Col span={3}>
					<BookDetailActionPanel
						thumbnail={searchBooksResponse.data.books[0].thumbnail}
						searchBook={searchBooksResponse.data.books[0]}
						totalBook={totalBook}
					/>
				</Grid.Col>
				<Grid.Col span={9}>
					<GlobalBookDetailContent
						book={searchBooksResponse.data.books[0]}
						bookId={bookId}
					/>
				</Grid.Col>
			</Grid>
		</Stack>
	);
};

export default GlobalBookDetailPage;
