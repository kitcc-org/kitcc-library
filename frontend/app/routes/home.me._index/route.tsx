import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	redirect,
} from '@remix-run/cloudflare';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { getLoans, getLoansResponse, upsertLoans } from 'client/client';
import { UpsertLoansBodyItem, User } from 'client/client.schemas';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import MyPageComponent from '~/components/me/MyPageComponent';
import { commitSession, getSession } from '~/services/session.server';
import { CartProps } from '~/stores/cartAtom';
import { displayLoanAtom, selectedLoanAtom } from '~/stores/loanAtom';
import { makeCookieHeader } from '~/utils/session';

interface LoaderData {
	userData: User;
	loansResponse: getLoansResponse;
	condition: {
		page?: string;
		limit?: string;
	};
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));
	const userData = session.get('user');

	const url = new URL(request.url);
	const page = url.searchParams.get('page') ?? undefined;
	const limit = url.searchParams.get('limit') ?? undefined;

	// 未ログインの場合
	if (!userData) {
		// ログインページへリダイレクト
		return redirect('/login', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	}

	const cookieHeader = makeCookieHeader(session);
	const loansResponse = await getLoans(
		{ userId: String(userData.id), page: page, limit: limit },
		{ headers: { Cookie: cookieHeader } },
	);

	return json<LoaderData>({
		userData: userData,
		loansResponse: loansResponse,
		condition: { page, limit },
	});
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));
	const userData = session.get('user');

	if (!userData) {
		return redirect('/login', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	}

	const cookieHeader = makeCookieHeader(session);

	const requestBody = await request.json<{ selectedLoan: CartProps[] }>();
	const selectedLoan = requestBody.selectedLoan;
	const upsertBody: UpsertLoansBodyItem[] = selectedLoan.map((loan) => {
		return {
			bookId: loan.id,
			userId: userData.id,
			volume: -loan.volume,
		};
	});

	const response = await upsertLoans(upsertBody, {
		headers: { Cookie: cookieHeader },
	});

	switch (response.status) {
		case 200:
			session.flash('success', '本を返却しました');
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
			session.flash('error', '本の返却に失敗しました');
			return redirect('/home/me', {
				headers: {
					'Set-Cookie': await commitSession(session),
				},
			});
	}
};

export const MyPage = () => {
	const { userData, loansResponse, condition } = useLoaderData<LoaderData>();
	const { page, limit } = condition;
	const navigate = useNavigate();
	const [, setDisplayLoan] = useAtom(displayLoanAtom);
	const [, setSelectedLoan] = useAtom(selectedLoanAtom);

	let bookArray: CartProps[] = [];

	useEffect(() => {
		setSelectedLoan([]);
	}, []);

	useEffect(() => {
		if (loansResponse) {
			bookArray = [];
			for (const loan of loansResponse.data.loans) {
				if (loan.books && loan.loans) {
					bookArray = [
						...bookArray,
						{
							...loan.books,
							stock: loan.loans.volume,
							volume: loan.loans.volume,
						},
					];
				}
			}
			setDisplayLoan(bookArray);
		}
	}, [loansResponse]);

	const handlePaginationChange = (newPage: number) => {
		const params = new URLSearchParams();

		if (limit) {
			params.append('limit', limit);
		}
		params.append('page', newPage.toString());

		navigate(`/home/me?${params.toString()}`);
	};

	const handleLimitChange = (newLimit: number) => {
		const params = new URLSearchParams();
		params.append('limit', newLimit.toString());
		navigate(`/home/me?${params.toString()}`);
	};

	return (
		<MyPageComponent
			user={userData}
			loansResponse={loansResponse}
			paginationProps={{
				handlePaginationChange: handlePaginationChange,
				handleLimitChange: handleLimitChange,
				page: page ? Number(page) : 1,
				limit: limit ? Number(limit) : 10,
				total: loansResponse.data.totalLoan,
			}}
		/>
	);
};

export default MyPage;
