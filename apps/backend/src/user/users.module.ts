import { Module } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { PrismaService } from "src/prisma/prisma.service.js";

@Module({
    imports:[PrismaService],
    providers:[UserService],
    exports:[UserService, PrismaService],
})
export class UserModule {}