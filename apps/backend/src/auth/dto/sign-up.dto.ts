import { IsEmail, IsString, MaxLength} from "class-validator";

export class SignUpDto {
    
    @IsEmail()
    readonly email!: string;

    @IsString()
    @MaxLength(30)
    readonly firstname!: string;

    @IsString()
    @MaxLength(30)
    readonly lastname!: string;
}