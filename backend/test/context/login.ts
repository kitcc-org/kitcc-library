import { userTable } from '@/drizzle/schema';
import { generateHash } from '@/src/utils/crypto';
import { env } from 'cloudflare:test';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { test } from 'vitest';
import { userFactory } from '../factories/user';

const password = 'passw0rd';
const digest = await generateHash(password);
const user = userFactory.build({ passwordDigest: digest });

export const loggedInTest = test.extend({
	password: password,
	currentUser: user,
	sessionToken: async ({}, use) => {
		const db = drizzle(env.DB);
		const sessionToken = crypto.randomUUID();

		const insertUser = await db
			.insert(userTable)
			.values({
				...user,
				sessionToken,
			})
			.returning();
		user.id = insertUser[0].id;

		await use(sessionToken);

		await db.delete(userTable).where(eq(userTable.email, user.email));
	},
});
