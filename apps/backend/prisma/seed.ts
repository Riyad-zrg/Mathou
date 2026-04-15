import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";
import "dotenv/config"
import { Pool } from "pg";
import bcrypt from "bcrypt";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main(){
    const saltRounds = 10;
    const myPlaintextPassword = 'johndoe'
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt); 

    const john = await prisma.user.upsert({
        where: { email: "john.doe@gmail.fr"},
        update: {},
        create: {
            email: "john.doe@gmail.fr",
            firstname: "Johnaaa",
            lastname: "Doe",
            password:hash,
        },
    });
    console.log(john);
}
main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e)=>{
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    })