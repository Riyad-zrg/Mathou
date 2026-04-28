import { IsString, IsStrongPassword } from "class-validator";

export class updatePasswordDto {
    @IsString()
    readonly token!: string;

    @IsStrongPassword()
    readonly password!: string;

    @IsStrongPassword()
    readonly confirmPassword!: string;
}