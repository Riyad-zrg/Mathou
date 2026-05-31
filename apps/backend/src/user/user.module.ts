import { Module } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { UserController } from './user.controller.js';
import { PasswordsModule } from "../passwords/passwords.module.js";

@Module({
    imports:[PrismaModule],
    providers:[UserService],
    exports:[UserService],
    controllers: [UserController],
})
export class UserModule {}