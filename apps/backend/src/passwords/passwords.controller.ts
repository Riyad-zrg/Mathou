import { Body, Controller, Post } from '@nestjs/common';
import { PasswordsService } from './passwords.service.js';
import { Public } from '../common/decorators/public.decorator.js';
import { passwordResetSpecifyEmailDto } from './dto/password-reset-specify-email.dto.js';
import { updatePasswordDto } from './dto/update-password.dto.js';

@Controller('password-reset')
export class PasswordsController {
  constructor(private readonly passwordsService: PasswordsService) {}

  @Public()
  @Post('/verify-email')
  passwordResetSpecifyEmail(@Body() passwordResetSpecifyEmail:passwordResetSpecifyEmailDto)
  {
      return this.passwordsService.passwordResetCheckEmail(passwordResetSpecifyEmail.email);
  }

  @Public()
  @Post('/update/password')
  verifyResetToken(@Body() updatePasswordDto:updatePasswordDto)
  {
      return this.passwordsService.udpatePassword(updatePasswordDto.token, updatePasswordDto.password, updatePasswordDto.confirmPassword);
  }
}
