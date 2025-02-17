import { useForm } from '@mantine/form';
import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	redirect,
} from '@remix-run/cloudflare';
import { useOutletContext, useSubmit } from '@remix-run/react';
import { updateBook } from 'client/client';
import { UpdateBookBody } from 'client/client.schemas';
import { commitSession, getSession } from '~/services/session.server';
import { formatDate } from '~/utils/date';
import { makeCookieHeader } from '~/utils/session';
import { BookDetailOutletContext } from '../home.books.$bookId/route';
import BookDetailEditContent from './components/BookDetailEditContent';

export interface CustomUpdateBookBody extends UpdateBookBody {
	customPublishedDate?: Date;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));

	if (!session.has('user')) {
		session.flash('error', 'ログインしてください');
		return redirect(`/login`, {
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
	if (!session.has('user')) {
		session.flash('error', 'ログインしてください');
		return redirect('/login', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	}

	const cookieHeader = makeCookieHeader(session);
	const formData = await request.formData();

	if (request.method === 'PATCH') {
		// 特定の書籍の情報を更新する
		const bookId = String(formData.get('bookId'));
		const title = String(formData.get('title'));
		const authors =
			String(formData.get('authors')) == ''
				? []
				: String(formData.get('authors')).split(',');
		const publisher = String(formData.get('publisher'));
		const publishedDate = String(formData.get('publishedDate'));
		const isbn = String(formData.get('isbn'));
		const stock = Number(formData.get('stock'));

		const response = await updateBook(
			bookId,
			{
				title: title === '' ? undefined : title,
				authors: authors.length === 0 ? undefined : authors,
				publisher: publisher === '' ? undefined : publisher,
				publishedDate: publishedDate === '' ? undefined : publishedDate,
				isbn: isbn === '' ? undefined : isbn,
				stock: stock === -1 ? undefined : stock,
			},
			{ headers: { Cookie: cookieHeader } },
		);
		switch (response.status) {
			case 200:
				session.flash('success', '書籍情報を更新しました');
				return redirect(`/home/books/${bookId}`, {
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
				return redirect(`/home/books/${bookId}`, {
					headers: {
						'Set-Cookie': await commitSession(session),
					},
				});
		}
	}

	return null;
};

const BookEditPage = () => {
	const { book } = useOutletContext<BookDetailOutletContext>();
	const submit = useSubmit();

	const form = useForm<CustomUpdateBookBody>({
		mode: 'uncontrolled',
		initialValues: {
			title: book.title,
			authors: book.authors,
			publisher: book.publisher,
			customPublishedDate: new Date(book.publishedDate),
			isbn: book.isbn,
			stock: book.stock,
		},
		validate: {
			isbn: (value) => {
				if (value && !/^\d{10}(\d{3})?$/.test(value)) {
					return 'ISBNは10桁または13桁の数字で入力してください';
				} else {
					return null;
				}
			},
			stock: (value) =>
				Number(value) < 0 && '在庫数は0以上の数字で入力してください',
		},
	});

	const handleSubmit = (props: CustomUpdateBookBody) => {
		submit(
			{
				bookId: book.id,
				title: props.title ?? '',
				authors: props.authors ?? [],
				publisher: props.publisher ?? '',
				publishedDate: props.customPublishedDate
					? formatDate(props.customPublishedDate)
					: '',
				isbn: props.isbn ?? '',
				stock: props.stock ?? -1,
			},
			{ method: 'PATCH', action: `/home/books/${book.id}/edit` },
		);
	};
	return <BookDetailEditContent form={form} handleSubmit={handleSubmit} />;
};

export default BookEditPage;
