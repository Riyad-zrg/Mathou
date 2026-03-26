import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/services/prisma.service.js";
import { UserService } from "src/prisma/services/user.service.js";

@Module({
    providers: [PrismaService, UserService],
    exports:[PrismaService, UserService],
})
export class PrismaModule {}