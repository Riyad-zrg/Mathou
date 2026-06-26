import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsEmail()
  readonly email!: string;

  readonly password!: string;
}
