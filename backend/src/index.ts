import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import book from './api/book';
import user from './api/user';

const app = new Hono();

app.use(logger());
app.use(prettyJSON());

app.route('/books', book);
app.route('/users', user);

export default app;
