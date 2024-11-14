import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { json } from '@remix-run/cloudflare';
import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { searchBooks, searchBooksResponse } from 'client/client';
import { SearchBooksParams } from 'client/client.schemas';
import GlobalBookListComponent from '~/components/global-books/GlobalBookListComponent';
import { useForm } from '@mantine/form';

interface LoaderData {
	booksResponse?: searchBooksResponse;
	condition: {
		keyword?: string;
		title?: string;
		author?: string;
		publisher?: string;
		isbn?: string;
		page?: string;
		limit?: string;
	};
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	let response: searchBooksResponse;
	// 検索条件を取得する
	const url = new URL(request.url);
	const keyword = url.searchParams.get('keyword') ?? undefined;
	const title = url.searchParams.get('title') ?? undefined;
	const publisher = url.searchParams.get('publisher') ?? undefined;
	const isbn = url.searchParams.get('isbn') ?? undefined;
	const author = url.searchParams.get('author') ?? undefined;
	const page = url.searchParams.get('page') ?? undefined;
	const limit = url.searchParams.get('limit') ?? undefined;
	// 検索条件が指定されていない場合は検索をしない
	if (!keyword && !title && !publisher && !isbn && !author) {
		return json<LoaderData>({
			booksResponse: undefined,
			condition: {
				keyword: keyword,
				title: title,
				author: author,
				publisher: publisher,
				isbn: isbn,
				page: page,
				limit: limit,
			},
		});
	} else if (keyword) {
		// 書籍情報を取得する(キーワード検索)
		response = await searchBooks({
			keyword: keyword,
			page: page,
			limit: limit,
		});

		return json<LoaderData>({
			booksResponse: response,
			condition: {
				keyword: keyword,
				title: title,
				author: author,
				publisher: publisher,
				isbn: isbn,
				page: page,
				limit: limit,
			},
		});
	} else {
		// 書籍情報を取得する(詳細検索)
		response = await searchBooks({
			intitle: title,
			inauthor: author,
			inpublisher: publisher,
			isbn: isbn,
			page: page,
			limit: limit,
		});
	}
	return json<LoaderData>({
		booksResponse: response,
		condition: {
			keyword: keyword,
			title: title,
			author: author,
			publisher: publisher,
			isbn: isbn,
			page: page,
			limit: limit,
		},
	});
};

const GlobalBookListPage = () => {
	const { booksResponse, condition } = useLoaderData<typeof loader>();
	const { keyword, title, author, publisher, isbn, page, limit } = condition;
	const [opened, { open, close }] = useDisclosure();
	const [searchMode, setSearchMode] = useState(keyword ? 'keyword' : 'detail');
	const navigate = useNavigate();
	const form = useForm<SearchBooksParams>({
		mode: 'uncontrolled',
		initialValues: {
			keyword: keyword ?? '',
			intitle: title ?? '',
			inauthor: author ?? '',
			inpublisher: publisher ?? '',
			isbn: isbn ?? '',
		},
	});

	const handleDetailSubmit = (props: SearchBooksParams) => {
		let url = '/home/global';
		let initial = true;
		if (props.intitle && props.intitle !== '') {
			url =
				initial === true
					? `${url}?title=${props.intitle}`
					: `${url}&title=${props.intitle}`;
			initial = false;
		}
		if (props.inauthor && props.inauthor !== '') {
			url =
				initial === true
					? `${url}?author=${props.inauthor}`
					: `${url}&author=${props.inauthor}`;
			initial = false;
		}
		if (props.inpublisher && props.inpublisher !== '') {
			url =
				initial === true
					? `${url}?publisher=${props.inpublisher}`
					: `${url}&publisher=${props.inpublisher}`;
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

	const handleKeywordSubmit = (props: SearchBooksParams) => {
		let url = '/home/global';
		let initial = true;
		if (props.keyword && props.keyword !== '') {
			url =
				initial === true
					? `${url}?keyword=${props.keyword}`
					: `${url}&keyword=${props.keyword}`;
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
		let url = '/home/global';
		let initial = true;
		if (keyword) {
			// キーワード検索
			url =
				initial === true
					? `${url}?keyword=${keyword}`
					: `${url}&keyword=${keyword}`;
			initial = false;
		} else {
			// 詳細検索
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
		let url = '/home/global';
		let initial = true;
		if (keyword) {
			// キーワード検索
			url =
				initial === true
					? `${url}?keyword=${keyword}`
					: `${url}&keyword=${keyword}`;
			initial = false;
		} else {
			// 詳細検索
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
		}
		url =
			initial === true
				? `${url}?limit=${newLimit}`
				: `${url}&limit=${newLimit}`;
		navigate(url);
	};

	return (
		<GlobalBookListComponent
			booksResponse={booksResponse}
			form={form}
			globalSearchFunctions={{
				handleDetailSubmit: handleDetailSubmit,
				handleKeywordSubmit: handleKeywordSubmit,
			}}
			isOpen={opened}
			open={open}
			close={close}
			paginationProps={{
				handlePaginationChange: handlePaginationChange,
				handleLimitChange: handleLimitChange,
				page: page ? Number(page) : undefined,
				limit: limit ? Number(limit) : undefined,
				totalNum: booksResponse ? booksResponse.data.totalBook : 0,
			}}
			searchMode={searchMode}
			setSearchMode={setSearchMode}
		/>
	);
};

export default GlobalBookListPage;
