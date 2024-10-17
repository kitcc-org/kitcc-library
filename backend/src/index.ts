import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import auth from './api/auth';
import book from './api/book';
import loan from './api/loan';
import user from './api/user';

const app = new Hono();

app.use(logger());
app.use(prettyJSON());
app.use(
	'*',
	cors({
		origin: (origin: string) => {
			return origin.includes('localhost')
				? origin
				: // TODO: フロントエンドのデプロイ先のURLを指定
				  'https://frontend.pages.dev';
		},
		// リクエストに含めることができるヘッダ
		allowHeaders: ['Cookie', 'Content-Type'],
		// 許可するメソッド
		// OPTIONSはプリフライトリクエストで使われる
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		// アクセスできるレスポンスのヘッダ
		exposeHeaders: ['Content-Type', 'Content-Length', 'Set-Cookie'],
		// 資格情報をフロントエンドのJSに公開するか
		// 資格情報とはCookie, 認証ヘッダー, TLSクライアント証明書
		credentials: true,
	})
);

app.route('/books', book);
app.route('/users', user);
app.route('/auth', auth);
app.route('/loans', loan);

export default app;
