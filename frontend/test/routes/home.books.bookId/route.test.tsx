import type * as remixrunCloudflare from '@remix-run/cloudflare';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/cloudflare';
import { createRemixStub } from '@remix-run/testing';
import { screen, waitFor } from '@testing-library/react';
import { customRender } from 'test/helpers/wrapper';
import BookDetailPage from '~/routes/home.books.$bookId._index/route';
import BookEditPage, {
	action as editAction,
	loader as editLoader,
} from '~/routes/home.books.$bookId.edit/route';
import BookDetail, {
	action as rootAction,
	loader as rootLoader,
} from '~/routes/home.books.$bookId/route';
import { redirect } from '../../mocks/@remix-run/cloudflare';

vi.mock('@remix-run/cloudflare', async (importOriginal) => {
	const actual = await importOriginal<typeof remixrunCloudflare>();
	return {
		...actual,
		redirect: (url: string, init?: number | ResponseInit) => {
			return redirect(url, init);
		},
	};
});

const BookDetailStub = createRemixStub([
	{
		path: '/home/books/:bookId',
		Component: BookDetail,
		async loader({ params, request }) {
			return await rootLoader({ params, request } as LoaderFunctionArgs);
		},
		async action({ request }) {
			return await rootAction({ request } as ActionFunctionArgs);
		},
		children: [
			{
				index: true,
				Component: BookDetailPage,
			},
			{
				path: '/home/books/:bookId/edit',
				Component: BookEditPage,
				async loader({ params, request }) {
					return await editLoader({ params, request } as LoaderFunctionArgs);
				},
				async action({ request }) {
					return await editAction({ request } as ActionFunctionArgs);
				},
			},
		],
	},
]);

describe('Book Detail Page', () => {
	describe('Action Panel', () => {
		it('should navigate to edit page when edit button is clicked', async () => {
			const { user } = customRender(
				<BookDetailStub initialEntries={['/home/books/1']} />,
			);

			// 編集ボタンが表示されている
			const editButton = await screen.findByRole('button', { name: '編集' });
			expect(editButton).toBeInTheDocument();

			// 編集ボタンをクリックする
			await user.click(editButton);

			// FIXME: 編集ページに遷移できない
		});

		it('should redirect login page when logout user clicks delete button', async () => {
			const { user } = customRender(
				<BookDetailStub initialEntries={['/home/books/1']} />,
			);

			// 削除ボタンが表示されている
			const deleteButton = await screen.findByRole('button', { name: '削除' });
			expect(deleteButton).toBeInTheDocument();

			// 削除ボタンをクリックする
			await user.click(deleteButton);

			// ログインページへリダイレクトされる
			expect(redirect).toHaveBeenCalledWith('/login', {
				headers: {
					'Set-Cookie': expect.any(String),
				},
			});

			// TODO: ログイン状態で削除ボタンをクリックした場合
		});
	});

	describe('Book Detail', () => {
		it('should display detail of book', async () => {
			customRender(<BookDetailStub initialEntries={['/home/books/1']} />);

			/* 書籍情報が表示されている */

			const authorsText = await screen.findByText('著者');
			expect(authorsText).toBeInTheDocument();

			const publisherText = await screen.findByText('出版社');
			expect(publisherText).toBeInTheDocument();

			const publishedDateText = await screen.findByText('出版日');
			expect(publishedDateText).toBeInTheDocument();

			const isbnText = await screen.findByText('ISBN');
			expect(isbnText).toBeInTheDocument();

			const stockText = await screen.findByText('在庫数');
			expect(stockText).toBeInTheDocument();
		});

		test('author badge', async () => {
			customRender(<BookDetailStub initialEntries={['/home/books/1']} />);

			// 著者のバッジを取得する
			const authorBadge = await screen.findAllByTestId('author-badge');
			expect(authorBadge.length).toBeGreaterThan(0);

			for (const badge of authorBadge) {
				// バッジのリンクが正しい
				expect(badge.getAttribute('href')).toMatch(/^\/home\?author=.+$/);
			}
		});

		it('should not display borrower badge when not logged in', async () => {
			customRender(<BookDetailStub initialEntries={['/home/books/1']} />);

			await waitFor(() => {
				// 借りている人が表示されていない
				const borrowerText = screen.queryByText('借りている人');
				expect(borrowerText).not.toBeInTheDocument();
			});
		});

		// TODO: ログイン状態で借りている人がいる場合
	});
});
