import { Prisma, PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config"

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
})

const prisma = new PrismaClient({
    adapter,
})

const problemData: Prisma.ProblemCreateInput[] = [
    {
        statement: "2+2",
        correctAnswer: "4",
    },
    {
        statement: "1+2",
        correctAnswer: "3",
    }
]

export async function main() {
    for (const p of problemData) {
        await prisma.problem.create({ data: p })
    }
}

main();