import { IsEmail, IsStrongPassword} from "class-validator";

export class ChoosePasswordDto {
    @IsEmail()
    readonly email!: string;

    @IsStrongPassword({minLength: 10})
    readonly password!: string;

    @IsStrongPassword({minLength: 10})
    readonly confirmPassword!: string;
}