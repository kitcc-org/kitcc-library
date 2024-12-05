import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { searchGoogleBooks, searchGoogleBooksResponse } from 'client/client';
import { SearchGoogleBooksParams } from 'client/client.schemas';
import { useState } from 'react';
import GlobalBookListComponent from '~/components/global-books/GlobalBookListComponent';

interface LoaderData {
	booksResponse?: searchGoogleBooksResponse;
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
	let response: searchGoogleBooksResponse;
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
		response = await searchGoogleBooks({
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
		response = await searchGoogleBooks({
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
	const form = useForm<SearchGoogleBooksParams>({
		mode: 'uncontrolled',
		initialValues: {
			keyword: keyword ?? '',
			intitle: title ?? '',
			inauthor: author ?? '',
			inpublisher: publisher ?? '',
			isbn: isbn ?? '',
		},
	});

	const handleDetailSubmit = (props: SearchGoogleBooksParams) => {
		const params = new URLSearchParams();

		if (props.intitle) {
			params.append('title', props.intitle);
		}
		if (props.inauthor) {
			params.append('author', props.inauthor);
		}
		if (props.inpublisher) {
			params.append('publisher', props.inpublisher);
		}
		if (props.isbn) {
			params.append('isbn', props.isbn);
		}
		if (limit) {
			params.append('limit', limit.toString());
		}

		navigate(`/home/global?${params.toString()}`);
	};

	const handleKeywordSubmit = (props: SearchGoogleBooksParams) => {
		const params = new URLSearchParams();

		if (props.keyword) {
			params.append('keyword', props.keyword);
		}
		if (limit) {
			params.append('limit', limit.toString());
		}

		navigate(`/home/global?${params.toString()}`);
	};

	const handlePaginationChange = (newPage: number) => {
		const params = new URLSearchParams();

		if (keyword) {
			// キーワード検索
			params.append('keyword', keyword);
		} else {
			// 詳細検索
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
		}
		if (limit) {
			params.append('limit', limit.toString());
		}
		params.append('page', newPage.toString());

		navigate(`/home/global?${params.toString()}`);
	};

	const handleLimitChange = (newLimit: number) => {
		const params = new URLSearchParams();

		if (keyword) {
			// キーワード検索
			params.append('keyword', keyword);
		} else {
			// 詳細検索
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
		}
		params.append('limit', newLimit.toString());

		navigate(`/home/global?${params.toString()}`);
	};

	return (
		<GlobalBookListComponent
			booksResponse={booksResponse}
			form={form}
			globalSearchFunctions={{
				handleDetailSubmit: handleDetailSubmit,
				handleKeywordSubmit: handleKeywordSubmit,
			}}
			disclosure={{ isOpen: opened, open, close }}
			paginationProps={{
				handlePaginationChange: handlePaginationChange,
				handleLimitChange: handleLimitChange,
				page: page ? Number(page) : undefined,
				limit: limit ? Number(limit) : undefined,
				total: booksResponse ? booksResponse.data.totalBook : 0,
			}}
			searchMode={searchMode}
			setSearchMode={setSearchMode}
		/>
	);
};

export default GlobalBookListPage;
