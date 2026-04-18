import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService : UserService,
        private JWTService : JwtService
    ){}

    async signIn(email: string, incomingPassword: string): Promise<{ access_token: string; }> {
        const user = await this.userService.findUser({email: email});

        if(!user){
            throw new NotFoundException('Aucun utilisateur avec cette adresse e-mail n\'a été trouvé.');
        }

        const match = await bcrypt.compare(incomingPassword, user.password);

        if(!match){
            throw new UnauthorizedException('Le mot de passe renseigné est incorrect.');
        }

        const payload = { sub: user?.id, email: user?.email}

        return{
            access_token: await this.JWTService.signAsync(payload),
        }
    }
}
