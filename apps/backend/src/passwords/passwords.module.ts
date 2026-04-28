import { Module } from '@nestjs/common';
import { PasswordsService } from './passwords.service.js';
import { PasswordsController } from './passwords.controller.js';
import { PrismaModule } from 'src/prisma/prisma.module.js';
import { UserModule } from 'src/user/user.module.js';

@Module({
  imports:[PrismaModule, UserModule],
  controllers: [PasswordsController],
  providers: [PasswordsService],
  exports: [PasswordsService],
})
export class PasswordsModule {}
