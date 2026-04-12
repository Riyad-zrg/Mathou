import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service.js';

@Injectable()
export class AuthService {
    constructor(private userService : UserService){}

    async signIn(email: string, password: string): Promise<any> { /** Ici le type est Promise<any>, il serait plus propre d'utiliser un DTO UserWithoutPassword */
        const user = await this.userService.findUser({email: email});
        
    }
}
