import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import {
	getGoogleBookParams,
	getGoogleBookResponse,
	searchGoogleBooksQueryParams,
	searchGoogleBooksResponse,
} from '../schema';

const app = new Hono<{ Bindings: Env }>();

/* Google Books APIのレスポンスボディ */
// Google Booksの書籍情報
interface GoogleBooksVolumeInfo {
	title: string;
	authors?: string[];
	publisher?: string;
	publishedDate?: string;
	description?: string;
	imageLinks?: {
		thumbnail: string;
	};
	industryIdentifiers?: {
		type: string;
		identifier: string;
	}[];
}
// 400(Bad Request)の場合
interface GoogleAPIError {
	error: {
		code: number;
		message: string;
		errors: {
			message: string;
			domain: string;
			reason: string;
		}[];
	};
}

const GOOGLE_BOOOKS_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

const getGoogleBookInfo = (volumeInfo: GoogleBooksVolumeInfo) => {
	// ISBNを取得する
	let isbn = undefined;
	if (volumeInfo.hasOwnProperty('industryIdentifiers')) {
		for (const identifier of volumeInfo.industryIdentifiers!) {
			if (identifier.type === 'ISBN_13') {
				isbn = identifier.identifier;
				break;
			} else if (identifier.type === 'ISBN_10') {
				isbn = identifier.identifier;
			}
		}
	}

	// 書籍情報を返す
	return {
		title: volumeInfo.title,
		authors: volumeInfo.authors ?? [],
		publisher: volumeInfo.publisher ?? '',
		publishedDate: volumeInfo.publishedDate ?? '',
		description: volumeInfo.description ?? '',
		thumbnail: volumeInfo.imageLinks?.thumbnail ?? '',
		isbn: isbn ?? '',
	};
};

app.get(
	'/',
	zValidator('query', searchGoogleBooksQueryParams, (result, ctx) => {
		if (!result.success) {
			return ctx.json(
				{
					message: 'Query Parameter Validation Error',
					error: result.error,
				},
				400,
			);
		}
	}),
	async (ctx) => {
		const query = ctx.req.valid('query');

		const page = parseInt(query['page'] ?? '1');
		const limit = parseInt(query['limit'] ?? '10');

		delete query['page'];
		delete query['limit'];

		// 絞り込み条件を作成する
		let terms = query['keyword'] ?? '';
		for (const [key, value] of Object.entries(query)) {
			if (value) {
				terms += `+${key}:${value}`;
			}
		}

		// クエリパラメータを作成する
		const params = new URLSearchParams({
			q: terms,
			startIndex: String((page - 1) * limit),
			maxResults: String(limit),
			key: ctx.env.GOOGLE_BOOKS_API_KEY,
		});

		// Google Books APIにリクエストを送信する
		const response = await fetch(
			`${GOOGLE_BOOOKS_BASE_URL}?${params.toString()}`,
		);
		if (response.status !== 200) {
			const error: GoogleAPIError = await response.json();
			return ctx.json(error, { status: response.status });
		}

		const volumeResult: {
			totalItems: number;
			items?: [
				{
					id: string;
					volumeInfo: GoogleBooksVolumeInfo;
				},
			];
		} = await response.json();
		// ヒットした書籍を格納する配列
		const hitBooks = [];

		// 書籍がヒットしたか確認する
		if (volumeResult.hasOwnProperty('items')) {
			// ヒットした書籍を配列に格納する
			for (const item of volumeResult.items ?? []) {
				// 書籍情報を取得する
				const bookInfo = getGoogleBookInfo(item.volumeInfo);

				// 書籍を配列に追加する
				hitBooks.push({ ...bookInfo, id: item.id });
			}
		}

		const responseBody = {
			totalBook: volumeResult.totalItems,
			books: hitBooks,
		};
		const result = searchGoogleBooksResponse.safeParse(responseBody);
		if (!result.success) {
			console.error(result.error);
			return ctx.json(
				{
					message: 'Response Validation Error',
				},
				500,
			);
		} else {
			return ctx.json(result.data);
		}
	},
);

app.get(
	'/:volumeId',
	zValidator('param', getGoogleBookParams, (result, ctx) => {
		if (!result.success) {
			return ctx.json(
				{
					message: 'Path Paramter Validation Error',
					error: result.error,
				},
				400,
			);
		}
	}),
	async (ctx) => {
		const param = ctx.req.valid('param');
		const volumeId = param['volumeId'];

		const response = await fetch(
			`${GOOGLE_BOOOKS_BASE_URL}/${volumeId}?key=${ctx.env.GOOGLE_BOOKS_API_KEY}`,
		);
		if (response.status !== 200) {
			const error: GoogleAPIError = await response.json();
			return ctx.json(error, { status: response.status });
		}

		const {
			id,
			volumeInfo,
		}: {
			id: string;
			volumeInfo: GoogleBooksVolumeInfo;
		} = await response.json();

		const bookInfo = getGoogleBookInfo(volumeInfo);

		const result = getGoogleBookResponse.safeParse({ ...bookInfo, id: id });
		if (!result.success) {
			console.error(result.error);
			return ctx.json(
				{
					message: 'Response Validation Error',
				},
				500,
			);
		} else {
			return ctx.json(result.data);
		}
	},
);

export default app;
