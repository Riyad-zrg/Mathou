import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserModule } from '../user/users.module.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[UserModule, JwtModule.register({ global: true, secret: process.env.JWT_SECRET, signOptions: {expiresIn: '60s'}})], //global signifie que tu n'as pas besoin d'importer le JWT Module ailleurs dans ton code
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
