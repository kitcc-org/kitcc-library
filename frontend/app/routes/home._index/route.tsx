import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import type {
	ActionFunctionArgs,
	LoaderFunctionArgs,
} from '@remix-run/cloudflare';
import { json, redirect } from '@remix-run/cloudflare';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { deleteBooks, getBooks, getBooksResponse } from 'client/client';
import { GetBooksParams } from 'client/client.schemas';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import BookListComponent from '~/components/books/BookListComponent';
import { commitSession, getSession } from '~/services/session.server';
import { SelectedBookProps, selectedBooksAtom } from '~/stores/bookAtom';

interface LoaderData {
	booksResponse: getBooksResponse;
	condition: {
		title?: string;
		author?: string;
		publisher?: string;
		isbn?: string;
		page?: string;
		limit?: string;
	};
}

export interface ActionResponse {
	method: string;
	status: number;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	// 検索条件を取得する
	const url = new URL(request.url);
	const title = url.searchParams.get('title') ?? undefined;
	const publisher = url.searchParams.get('publisher') ?? undefined;
	const isbn = url.searchParams.get('isbn') ?? undefined;
	const author = url.searchParams.get('author') ?? undefined;
	const page = url.searchParams.get('page') ?? undefined;
	const limit = url.searchParams.get('limit') ?? undefined;
	// 書籍情報を取得する
	const response = await getBooks({
		title: title,
		author: author,
		publisher: publisher,
		isbn: isbn,
		page: page,
		limit: limit,
	});

	return json<LoaderData>({
		booksResponse: response,
		condition: {
			title: title,
			author: author,
			publisher: publisher,
			isbn: isbn,
			page: page,
			limit: limit,
		},
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
		`__Secure-user_id=${session.get('user')};`,
		`__Secure-session_token=${session.get('sessionToken')}`,
	].join('; ');

	// prettier-ignore
	const requestBody = await request.json<{ selectedBook: SelectedBookProps[] }>();
	const selectedBook = requestBody.selectedBook;

	const response = await deleteBooks(
		{
			bookIdList: selectedBook.map((book) => book.id),
		},
		{
			headers: { Cookie: cookieHeader },
		},
	);

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

		default:
			session.flash('error', '削除に失敗しました');
			return json<ActionResponse>(
				{ method: 'DELETE', status: response.status },
				{
					headers: {
						'Set-Cookie': await commitSession(session),
					},
				},
			);
	}
};

const BooKListPage = () => {
	const { booksResponse, condition } = useLoaderData<typeof loader>();
	const { title, author, publisher, isbn, page, limit } = condition;

	const [, setSelectedBook] = useAtom(selectedBooksAtom);

	const [opened, { open, close }] = useDisclosure();
	const navigate = useNavigate();
	const form = useForm<GetBooksParams>({
		mode: 'uncontrolled',
		initialValues: {
			title: title ?? '',
			author: author ?? '',
			publisher: publisher ?? '',
			isbn: isbn ?? '',
		},
	});

	useEffect(() => {
		// 選択中の書籍をリセットする
		setSelectedBook([]);
	}, []);

	const handleSubmit = (props: GetBooksParams) => {
		let url = '/home';
		let initial = true;
		if (props.title && props.title !== '') {
			url =
				initial === true
					? `${url}?title=${props.title}`
					: `${url}&title=${props.title}`;
			initial = false;
		}
		if (props.author && props.author !== '') {
			url =
				initial === true
					? `${url}?author=${props.author}`
					: `${url}&author=${props.author}`;
			initial = false;
		}
		if (props.publisher && props.publisher !== '') {
			url =
				initial === true
					? `${url}?publisher=${props.publisher}`
					: `${url}&publisher=${props.publisher}`;
			initial = false;
		}
		if (props.isbn && props.isbn !== '') {
			url =
				initial === true
					? `${url}?isbn=${props.isbn}`
					: `${url}&isbn=${props.isbn}`;
			initial = false;
		}
		if (limit) {
			url =
				initial === true ? `${url}?limit=${limit}` : `${url}&limit=${limit}`;
			initial = false;
		}
		navigate(url);
	};

	const handlePaginationChange = (newPage: number) => {
		let url = '/home';
		let initial = true;
		if (title) {
			url =
				initial === true ? `${url}?title=${title}` : `${url}&title=${title}`;
			initial = false;
		}
		if (author) {
			url =
				initial === true
					? `${url}?author=${author}`
					: `${url}&author=${author}`;
			initial = false;
		}
		if (publisher) {
			url =
				initial === true
					? `${url}?publisher=${publisher}`
					: `${url}&publisher=${publisher}`;
			initial = false;
		}
		if (isbn) {
			url = initial === true ? `${url}?isbn=${isbn}` : `${url}&isbn=${isbn}`;
			initial = false;
		}
		if (limit) {
			url =
				initial === true ? `${url}?limit=${limit}` : `${url}&limit=${limit}`;
			initial = false;
		}
		url =
			initial === true ? `${url}?page=${newPage}` : `${url}&page=${newPage}`;
		navigate(url);
	};

	const handleLimitChange = (newLimit: number) => {
		let url = '/home';
		let initial = true;
		if (title) {
			url =
				initial === true ? `${url}?title=${title}` : `${url}&title=${title}`;
			initial = false;
		}
		if (author) {
			url =
				initial === true
					? `${url}?author=${author}`
					: `${url}&author=${author}`;
			initial = false;
		}
		if (publisher) {
			url =
				initial === true
					? `${url}?publisher=${publisher}`
					: `${url}&publisher=${publisher}`;
			initial = false;
		}
		if (isbn) {
			url = initial === true ? `${url}?isbn=${isbn}` : `${url}&isbn=${isbn}`;
			initial = false;
		}
		url =
			initial === true
				? `${url}?limit=${newLimit}`
				: `${url}&limit=${newLimit}`;
		navigate(url);
	};

	return (
		<BookListComponent
			booksResponse={booksResponse}
			form={form}
			handleSubmit={handleSubmit}
			isOpen={opened}
			open={open}
			close={close}
			handlePaginationChange={handlePaginationChange}
			handleLimitChange={handleLimitChange}
			page={page ? Number(page) : undefined}
			limit={limit ? Number(limit) : undefined}
			totalBook={booksResponse.data.totalBook}
		/>
	);
};

export default BooKListPage;
