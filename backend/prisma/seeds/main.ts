import { PrismaClient } from '@prisma/client';
import { seedBooks } from './book';

const prisma = new PrismaClient();

async function main() {
	seedBooks();
}

main()
	.catch((e) => {
		console.error(e);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
