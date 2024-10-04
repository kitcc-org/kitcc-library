import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

export const getPrismaClient = (connectionString: string) => {
	const pool = new Pool({ connectionString });
	const adapter = new PrismaPg(pool);
	const prisma = new PrismaClient({ adapter });

	return prisma;
};
