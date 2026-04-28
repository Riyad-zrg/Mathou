import { Module } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { UserController } from './user.controller.js';
import { PasswordsModule } from "src/passwords/passwords.module.js";

@Module({
    imports:[PrismaModule, PasswordsModule],
    providers:[UserService],
    exports:[UserService],
    controllers: [UserController],
})
export class UserModule {}