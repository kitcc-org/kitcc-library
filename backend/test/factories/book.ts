import { InsertBook } from '@/drizzle/schema';
import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

export const bookFactory = Factory.Sync.makeFactory<InsertBook>({
	title: faker.lorem.words(5),
	authors: [faker.person.fullName()],
	publisher: faker.company.name(),
	publishedDate: faker.date.past().toISOString().slice(0, 10),
	description: faker.lorem.paragraph(),
	thumbnail: faker.image.url(),
	isbn: Factory.Sync.each((id) => id.toString().padStart(13, '0')),
	stock: faker.number.int(5),
});
