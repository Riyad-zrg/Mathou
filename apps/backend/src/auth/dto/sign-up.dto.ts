import { IsEmail, IsString, MaxLength} from "class-validator";

export class SignInDto {
    
    @IsEmail()
    readonly email!: string;

    @IsString()
    @MaxLength(30)
    readonly firstname!: string;

    @IsString()
    @MaxLength(30)
    readonly lastname!: string;
}