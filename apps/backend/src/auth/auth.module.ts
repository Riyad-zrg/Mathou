import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserModule } from '../user/user.module.js';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard.js';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[UserModule, JwtModule.register({ global: true, secret: process.env.JWT_SECRET, signOptions: {expiresIn: '60s'}}), MailerModule],
  controllers: [AuthController],
  providers: [AuthService, {provide: APP_GUARD, useClass: AuthGuard}],
})
export class AuthModule {}
