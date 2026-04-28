import { IsEmail } from "class-validator";

export class passwordResetSpecifyEmailDto {
    @IsEmail()
    readonly email!: string;
}