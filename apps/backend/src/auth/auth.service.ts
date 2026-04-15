import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service.js';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private userService : UserService){}

    async signIn(email: string, incomingPassword: string): Promise<any> { /** Ici le type est Promise<any>, il serait plus propre d'utiliser un DTO UserWithoutPassword */
        const user = await this.userService.findUser({email: email});
        const match = await bcrypt.compare(incomingPassword, user.password);

        if(!match){
            throw new UnauthorizedException();
        }

        const {password, ...userWithoutPassword} = user;

        return userWithoutPassword;
    }
}
