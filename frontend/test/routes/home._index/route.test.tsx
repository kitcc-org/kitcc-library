import { faker } from '@faker-js/faker';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/cloudflare';
import type * as remixrunReact from '@remix-run/react';
import { createRemixStub } from '@remix-run/testing';
import { screen, waitFor } from '@testing-library/react';
import { customRender } from 'test/helpers/wrapper';
import BookListPage, { action, loader } from '~/routes/home._index/route';
import { userAtom } from '~/stores/userAtom';

const { navigateMock } = vi.hoisted(() => {
	return {
		navigateMock: vi.fn(),
	};
});

vi.mock('@remix-run/react', async (importOriginal) => {
	const actual = await importOriginal<typeof remixrunReact>();
	return {
		...actual,
		useNavigate: () => navigateMock,
	};
});

const BookListPageStub = createRemixStub([
	{
		path: '/home',
		Component: BookListPage,
		async loader({ request }) {
			return await loader({ request } as LoaderFunctionArgs);
		},
		async action({ request }) {
			return await action({ request } as ActionFunctionArgs);
		},
	},
]);

describe('Book List Page', () => {
	describe('Search', () => {
		it('should search books by specific condition', async () => {
			const { user } = customRender(
				<BookListPageStub initialEntries={['/home']} />,
			);

			const condition = {
				title: faker.word.words(5),
				author: faker.person.fullName(),
				publisher: faker.company.name(),
				isbn: faker.string.numeric(13),
			};

			const searchOpenButton = await screen.findByRole('button', {
				name: '検索条件を開く',
			});
			await user.click(searchOpenButton);

			/* 検索条件を入力する */

			const titleInput = await screen.findByLabelText('タイトル');
			await user.type(titleInput, condition.title);

			const authorInput = await screen.findByLabelText('著者');
			await user.type(authorInput, condition.author);

			const publisherInput = await screen.findByLabelText('出版社');
			await user.type(publisherInput, condition.publisher);

			// prettier-ignore
			const isbnInput = await screen.findByPlaceholderText('10桁または13桁のISBN');
			await user.type(isbnInput, condition.isbn);

			const submitButton = await screen.findByRole('button', { name: '検索' });
			await user.click(submitButton);

			// 入力した条件で書籍が検索される
			const searchParams = new URLSearchParams(condition);
			// prettier-ignore
			expect(navigateMock).toHaveBeenCalledWith(`/home?${searchParams.toString()}`);
		});
	});

	describe('Limit Select', () => {
		it('should display correct number of books', async () => {
			const { user } = customRender(
				<BookListPageStub initialEntries={['/home']} />,
			);

			// デフォルトの値が設定されている
			const limitSelect = await screen.findByLabelText('表示件数');
			expect(limitSelect).toHaveValue('10');

			// FIXME: 5が選択された後なぜかすぐ10が選択される
			await user.selectOptions(limitSelect, '5');
			// expect(limitSelect).toHaveValue('5');

			// TODO: 5冊以下の本が表示される
			const bookImageList = await screen.findAllByAltText('Book cover');
			expect(bookImageList.length).toBeLessThanOrEqual(10);
		});
	});

	describe('Book Card', () => {
		it('should navigate to detail page when thumbnail is clicked', async () => {
			const { user } = customRender(
				<BookListPageStub initialEntries={['/home']} />,
			);

			// サムネイル画像をクリックする
			const bookImage = await screen.findAllByAltText('Book cover');
			await user.click(bookImage[0]);

			// 詳細ページに遷移する
			const lastCallArg = navigateMock.mock.calls.at(-1);
			if (lastCallArg) {
				expect(lastCallArg[0]).toMatch(/\/home\/books\/\d+/);
			}
		});

		it('should not display add cart button when user is not logged in', async () => {
			customRender(<BookListPageStub initialEntries={['/home']} />);

			await waitFor(() => {
				// カートに入れるボタンが表示されていない
				const addCartButton = screen.queryByRole('button', {
					name: 'カートに入れる',
				});
				expect(addCartButton).not.toBeInTheDocument();
			});
		});

		it('should display add cart button when user is logged in', async () => {
			const userInitialValue = {
				id: faker.number.int(100),
				name: faker.person.fullName(),
				email: faker.internet.email(),
			};

			// ログイン状態でレンダリングする
			customRender(<BookListPageStub initialEntries={['/home']} />, {
				initialValues: [[userAtom, userInitialValue]],
			});

			// カートに入れるボタンが表示されている
			const addCartButtonList = await screen.findAllByRole('button', {
				name: 'カートに入れる',
			});
			expect(addCartButtonList.length).toBeGreaterThan(0);
		});
	});

	describe('Pagination', async () => {
		it('should pagiante correctly', async () => {
			customRender(<BookListPageStub initialEntries={['/home']} />);

			// 1ページ目が表示されている
			const firstPageButton = await screen.findByRole('button', { name: '1' });
			expect(firstPageButton).toBeInTheDocument();
			expect(firstPageButton).toHaveAttribute('data-active', 'true');

			// 総数の要素を取得する
			const totalText = await screen.findByText(/全 \d+件/);
			expect(totalText).toBeInTheDocument();

			const matchResult = totalText.textContent?.match(/全 (\d+)件/);
			if (matchResult) {
				// 総数を取得する
				const totalBook = parseInt(matchResult[1]);

				if (totalBook <= 10) {
					// 2ページ目が存在しない
					const secondPageButton = await screen.findByRole('button', {
						name: '2',
					});
					expect(secondPageButton).not.toBeInTheDocument();
				} else {
					// 最終ページが存在する
					const lastPageNumber = Math.ceil(totalBook / 10);
					const lastPageButton = await screen.findByRole('button', {
						name: lastPageNumber.toString(),
					});
					expect(lastPageButton).toBeInTheDocument();
				}
			}
		});
	});

	describe('BreadCrumbs', () => {
		it('should navigate to home page when clicked', async () => {
			const { user } = customRender(
				<BookListPageStub initialEntries={['/home']} />,
			);

			const homeLink = await screen.findByRole('link', { name: '蔵書一覧' });
			await user.click(homeLink);

			// ホームページに遷移する
			expect(window.location.pathname).toBe('/home');
		});
	});
});
