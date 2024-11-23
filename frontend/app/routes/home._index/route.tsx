import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import type {
	ActionFunctionArgs,
	LoaderFunctionArgs,
} from '@remix-run/cloudflare';
import { json, redirect } from '@remix-run/cloudflare';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { deleteBooks, getBooks, getBooksResponse } from 'client/client';
import { Book, GetBooksParams } from 'client/client.schemas';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import BookListComponent from '~/components/books/BookListComponent';
import { commitSession, getSession } from '~/services/session.server';
import { selectedBooksAtom } from '~/stores/bookAtom';
import { ActionResponse } from '~/types/response';

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
		`__Secure-user_id=${session.get('user')?.id};`,
		`__Secure-session_token=${session.get('user')?.sessionToken}`,
	].join('; ');

	// prettier-ignore
	const requestBody = await request.json<{ selectedBook: Book[] }>();
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
		const params = new URLSearchParams();

		if (props.title) {
			params.append('title', props.title);
		}
		if (props.author) {
			params.append('author', props.author);
		}
		if (props.publisher) {
			params.append('publisher', props.publisher);
		}
		if (props.isbn) {
			params.append('isbn', props.isbn);
		}
		if (limit) {
			params.append('limit', limit.toString());
		}

		navigate(`/home?${params.toString()}`);
	};

	const handlePaginationChange = (newPage: number) => {
		const params = new URLSearchParams();

		if (title) {
			params.append('title', title);
		}
		if (author) {
			params.append('author', author);
		}
		if (publisher) {
			params.append('publisher', publisher);
		}
		if (isbn) {
			params.append('isbn', isbn);
		}
		if (limit) {
			params.append('limit', limit.toString());
		}
		params.append('page', newPage.toString());

		navigate(`/home?${params.toString()}`);
	};

	const handleLimitChange = (newLimit: number) => {
		const params = new URLSearchParams();

		if (title) {
			params.append('title', title);
		}
		if (author) {
			params.append('author', author);
		}
		if (publisher) {
			params.append('publisher', publisher);
		}
		if (isbn) {
			params.append('isbn', isbn);
		}
		params.append('limit', newLimit.toString());

		navigate(`/home?${params.toString()}`);
	};

	return (
		<BookListComponent
			booksResponse={booksResponse}
			form={form}
			handleSubmit={handleSubmit}
			isOpen={opened}
			open={open}
			close={close}
			paginationProps={{
				handlePaginationChange: handlePaginationChange,
				handleLimitChange: handleLimitChange,
				page: page ? Number(page) : undefined,
				limit: limit ? Number(limit) : undefined,
				total: booksResponse.data.totalBook,
			}}
		/>
	);
};

export default BooKListPage;
