import { InsertUser } from '@/drizzle/schema';
import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

export const userFactory = Factory.Sync.makeFactory<InsertUser>({
	name: faker.person.fullName(),
	email: Factory.Sync.each((id) => {
		const username = faker.person.firstName().toLowerCase();
		const domain = faker.internet.domainName();
		return `${username}${id}@${domain}`;
	}),
	passwordDigest: faker.string.alphanumeric(32),
});
