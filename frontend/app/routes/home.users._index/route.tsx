import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	redirect,
} from '@remix-run/cloudflare';
import { useFetcher, useLoaderData, useNavigate } from '@remix-run/react';
import { deleteUser, getUsers, getUsersResponse } from 'client/client';
import UsersListComponent from '~/components/users/UsersListComponent';
import { commitSession, getSession } from '~/services/session.server';
import { ActionResponse } from '~/types/response';

interface LoaderData {
	usersResponse: getUsersResponse;
	condition: {
		page?: string;
		limit?: string;
	};
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	// 検索条件を取得する
	const url = new URL(request.url);
	const page = url.searchParams.get('page') ?? undefined;
	const limit = url.searchParams.get('limit') ?? undefined;
	// ユーザー情報を取得する
	const response = await getUsers({ page: page, limit: limit });

	return json<LoaderData>({
		usersResponse: response,
		condition: {
			page: page,
			limit: limit,
		},
	});
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const session = await getSession(request.headers.get('Cookie'));
	const formData = await request.formData();
	const userId = String(formData.get('userId'));

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

	const response = await deleteUser(userId, {
		headers: { Cookie: cookieHeader },
	});

	switch (response.status) {
		case 204:
			session.flash('success', 'ユーザーを削除しました');
			if (Number(userId) === session.get('user')?.id) {
				session.unset('user');
				session.flash('success', 'ログアウトしました');
				return redirect('/home', {
					headers: {
						'Set-Cookie': await commitSession(session),
					},
				});
			}
			break;
		case 401:
			session.flash('error', 'ログインしてください');
			return redirect('/login', {
				headers: {
					'Set-Cookie': await commitSession(session),
				},
			});
		case 404:
			session.flash('error', 'ユーザーが見つかりませんでした');
			break;
		case 500:
			session.flash('error', 'サーバーエラーが発生しました');
			break;
	}
	return json<ActionResponse>(
		{ method: 'DELETE', status: response.status },
		{
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		},
	);
};

const UsersListPage = () => {
	const { usersResponse, condition } = useLoaderData<typeof loader>();
	const { page, limit } = condition;
	const navigate = useNavigate();
	const fetcher = useFetcher();
	const handlePaginationChange = (newPage: number) => {
		let url = '/home/users';
		let initial = true;
		if (limit) {
			url =
				initial === true ? `${url}?limit=${limit}` : `${url}&limit=${limit}`;
			initial = false;
		}
		url =
			initial === true ? `${url}?page=${newPage}` : `${url}&page=${newPage}`;
		navigate(url);
	};

	const handleLimitChange = (newLimit: number) =>
		navigate(`/home/users?limit=${newLimit}`);

	const handleDeleteUserButtonClick = (id: number) => {
		fetcher.submit(
			{ userId: id },
			{
				method: 'DELETE',
			},
		);
	};

	return (
		<UsersListComponent
			paginationProps={{
				handlePaginationChange: handlePaginationChange,
				handleLimitChange: handleLimitChange,
				page: page ? Number(page) : undefined,
				limit: limit ? Number(limit) : undefined,
				totalNum: usersResponse.data.totalUser,
			}}
			usersResponse={usersResponse}
			handleDeleteUserButtonClick={handleDeleteUserButtonClick}
		/>
	);
};

export default UsersListPage;
