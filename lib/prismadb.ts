import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neon } from "@neondatabase/serverless";

declare global {
    var prisma: PrismaClient | undefined;
}

const sql = neon(process.env.DATABASE_URL!);
const adapter = new PrismaNeon(sql);

const prismadb = globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;