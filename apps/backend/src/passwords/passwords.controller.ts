import { Body, Controller, Post } from '@nestjs/common';
import { PasswordsService } from './passwords.service.js';
import { Public } from '../common/decorators/public.decorator.js';
import { passwordResetSpecifyEmailDto } from '../auth/dto/password-reset-specify-email.dto.js';

@Controller('passwords')
export class PasswordsController {
  constructor(private readonly passwordsService: PasswordsService) {}

  @Public()
  @Post('password-reset/verify-email')
  passwordResetSpecifyEmail(@Body() passwordResetSpecifyEmail:passwordResetSpecifyEmailDto)
  {
      return this.passwordsService.passwordResetCheckEmail(passwordResetSpecifyEmail.email);
  }
}
