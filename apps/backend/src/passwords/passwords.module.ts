import { Module } from '@nestjs/common';
import { PasswordsService } from './passwords.service.js';
import { PasswordsController } from './passwords.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { UserModule } from '../user/user.module.js';

@Module({
  imports:[UserModule, PrismaModule],
  controllers: [PasswordsController],
  providers: [PasswordsService],
  exports: [PasswordsService],
})
export class PasswordsModule {}
