import { bookTable } from '@/drizzle/schema';
import { faker } from '@faker-js/faker';
import { InferInsertModel } from 'drizzle-orm';
import * as Factory from 'factory.ts';

type Book = InferInsertModel<typeof bookTable>;

export const bookFactory = Factory.Sync.makeFactory<Book>({
	title: faker.lorem.words(5),
	author: [faker.person.fullName()],
	publisher: faker.company.name(),
	thumbnail: faker.image.url(),
	isbn: faker.string.numeric(13),
	stock: faker.number.int(5),
});
