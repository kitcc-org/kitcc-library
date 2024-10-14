import { userTable } from '@/drizzle/schema';
import app from '@/src/index';
import { env } from 'cloudflare:test';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { userFactory } from '../factories/user';

describe('GET /users/:userId', () => {
	const db = drizzle(env.DB);
	const user = userFactory.build();

	beforeAll(async () => {
		await db.insert(userTable).values(user);
	});

	afterAll(async () => {
		await db.delete(userTable);
		userFactory.resetSequenceNumber();
	});

	it('should return correct user', async () => {
		const response = await app.request(`/users/1`, {}, env);
		const result = await response.json();

		expect(response.status).toBe(200);
		expect(result).toMatchObject(user);
	});

	it('should return 400 when userId is not a number', async () => {
		const response = await app.request(`/users/id`, {}, env);

		expect(response.status).toBe(400);
	});

	it('should return 404 when user is not found', async () => {
		const response = await app.request(`/users/100`, {}, env);

		expect(response.status).toBe(404);
	});
});

describe('PUT /users/:userId', () => {
	const db = drizzle(env.DB);
	const users = userFactory.buildList(2);

	beforeEach(async () => {
		await db.insert(userTable).values(users);
	});

	afterEach(async () => {
		await db.delete(userTable);
	});

	afterAll(() => {
		userFactory.resetSequenceNumber();
	});

	it('should update user', async () => {
		const user = {
			name: '比企谷八幡',
			email: 'hikigaya@oregairu.com',
			password: 'password',
		};

		const users = await db.select().from(userTable);
		const response = await app.request(
			`/users/${users[0].id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			},
			env
		);

		expect(response.status).toBe(200);

		const updatedUser = await db
			.select()
			.from(userTable)
			.where(eq(userTable.id, users[0].id));
		const { password, ...rest } = user;
		expect(updatedUser[0]).toMatchObject(rest);
	});

	it('should return 400 when userId is not a number', async () => {
		const response = await app.request(
			`/users/id`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name: 'username' }),
			},
			env
		);

		expect(response.status).toBe(400);
	});

	it('should return 400 when name is not a string', async () => {
		const response = await app.request(
			`/users/1`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name: 1 }),
			},
			env
		);

		expect(response.status).toBe(400);
	});

	it('should return 400 when email is not a string', async () => {
		const response = await app.request(
			`/users/1`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: 1 }),
			},
			env
		);

		expect(response.status).toBe(400);
	});

	it('should return 400 when password is not a string', async () => {
		const response = await app.request(
			`/users/1`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ password: 1 }),
			},
			env
		);

		expect(response.status).toBe(400);
	});

	it('should return 400 when violate email unique constraint', async () => {
		const users = await db.select().from(userTable);

		const response = await app.request(
			`/users/${users[1].id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: users[0].email }),
			},
			env
		);

		expect(response.status).toBe(400);
	});

	// TODO:未ログインの時

	it('should return 404 when user is not found', async () => {
		const response = await app.request(
			`/users/100`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name: 'username' }),
			},
			env
		);

		expect(response.status).toBe(404);
	});
});

describe('DELETE /users/:userId', () => {
	const db = drizzle(env.DB);
	const user = userFactory.build();

	beforeEach(async () => {
		await db.insert(userTable).values(user);
	});

	afterEach(async () => {
		await db.delete(userTable);
	});

	afterAll(() => {
		userFactory.resetSequenceNumber();
	});

	it('should delete user', async () => {
		const users = await db.select().from(userTable);

		const response = await app.request(
			`/users/${users[0].id}`,
			{
				method: 'DELETE',
			},
			env
		);

		expect(response.status).toBe(204);

		const deletedBook = await db
			.select()
			.from(userTable)
			.where(eq(userTable.id, users[0].id));
		expect(deletedBook).toHaveLength(0);
	});

	it('should return 400 when userId is not a number', async () => {
		const response = await app.request(
			`/users/id`,
			{
				method: 'DELETE',
			},
			env
		);

		expect(response.status).toBe(400);
	});

	// TODO:未ログインの時

	it('should return 404 when user is not found', async () => {
		const response = await app.request(
			`/users/100`,
			{
				method: 'DELETE',
			},
			env
		);

		expect(response.status).toBe(404);
	});
});
