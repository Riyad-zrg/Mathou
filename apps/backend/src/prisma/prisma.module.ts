import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service.js";
import { UserService } from "src/user/user.service.js";

@Module({
    providers: [PrismaService, UserService],
    exports:[PrismaService, UserService],
})
export class PrismaModule {}