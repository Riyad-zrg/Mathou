import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    readonly email!: string;
    
    @IsString()
    @IsNotEmpty()
    readonly firstname!: string;
    
    @IsString()
    @IsNotEmpty()
    readonly lastname!: string;

    @IsStrongPassword({minLength: 10})
    readonly password!: string;    
}