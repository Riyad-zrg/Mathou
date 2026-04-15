import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserModule } from 'src/user/users.module.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[UserModule, JwtModule.register({ secret: process.env.JWTSecret})],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
