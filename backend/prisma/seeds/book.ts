import { faker } from '@faker-js/faker';
import { Book, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedBooks = async () => {
	const books: Book[] = [];

	for (let id = 0; id < 10; id++) {
		books.push({
			id: id,
			title: faker.lorem.words(3),
			author: [faker.person.fullName()],
			publisher: faker.company.name(),
			thumbnail: faker.image.url(),
			isbn: faker.string.numeric(13),
			stock: faker.number.int({ min: 1, max: 5 }),
		});
	}

	await prisma.book.createMany({
		data: books,
		skipDuplicates: true,
	});
};
