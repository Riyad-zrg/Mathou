import { IsNumber, IsString, IsStrongPassword } from "class-validator";

export class updatePasswordDto {
    @IsString()
    readonly token!: string;

    @IsString()
    readonly resetId!: string;

    @IsStrongPassword()
    readonly password!: string;

    @IsStrongPassword()
    readonly confirmPassword!: string;
}