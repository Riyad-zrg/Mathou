import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service.js";

@Module({
    providers: [PrismaService],
    exports:[PrismaService],
})
export class PrismaModule {}