import {
  Controller,
  Post,
  HttpStatus,
  Body,
  HttpCode,
  Get,
  Request,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignInDto } from './dto/sign-in.dto.js';
import { Public } from '../common/decorators/public.decorator.js';
import type { Response as ExpressResponse } from 'express';
import { SignUpDto } from './dto/sign-up.dto.js';
import { VerifyEmailDto } from './dto/verify-email.dto..js';
import { ChoosePasswordDto } from './dto/choose-password.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(
    @Body() signInDto: SignInDto,
    @Response({ passthrough: true }) response: ExpressResponse,
  ) {
    return this.authService.signIn(
      signInDto.email,
      signInDto.password,
      response,
    );
  }

  @Public()
  @Post('logout')
  logout(@Response({ passthrough: true }) response: ExpressResponse) {
    return this.authService.logout(response);
  }

  @Public()
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(
      signUpDto.email,
      signUpDto.firstname,
      signUpDto.lastname,
    );
  }

  @Public()
  @Post('verify-email')
  verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto.token);
  }

  @Public()
  @Post('choose-password')
  choosePassword(@Body() choosePasswordDto: ChoosePasswordDto) {
    return this.authService.choosePassword(
      choosePasswordDto.email,
      choosePasswordDto.password,
      choosePasswordDto.confirmPassword,
    );
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
