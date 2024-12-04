import app from '@/src/index';
import { env } from 'cloudflare:test';

describe('GET /googlebooks', () => {
	it('should return 400 when page is not a number', async () => {
		// pageに数字以外を指定する
		const response = await app.request('/googlebooks?page=a', {}, env);

		expect(response.status).toBe(400);
	});

	it('should return 400 when limit is not a number', async () => {
		// limitに数字以外を指定する
		const response = await app.request('/googlebooks?limit=a', {}, env);

		expect(response.status).toBe(400);
	});

	it('should return 400 when isbn is not 10|13 digits number', async () => {
		// ISBNに10 or 13桁以外の数字を指定する
		// prettier-ignore
		const response = await app.request('/googlebooks?isbn=123456789', {}, env);

		expect(response.status).toBe(400);
	});
});
