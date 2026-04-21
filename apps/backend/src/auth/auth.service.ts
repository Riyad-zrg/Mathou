import { Injectable, Logger, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private userService : UserService,
        private JWTService : JwtService
    ){}

    async signIn(email: string, incomingPassword: string, response: Response): Promise<void>{
        const user = await this.userService.findUser({email: email});

        if(!user){
            throw new NotFoundException('Aucun utilisateur avec cette adresse e-mail n\'a été trouvé.');
        }

        const match = await bcrypt.compare(incomingPassword, user.password);

        if(!match){
            throw new UnauthorizedException('Le mot de passe renseigné est incorrect.');
        }

        const payload = { sub: user?.id, email: user?.email}

        const access_token = await this.JWTService.signAsync(payload);

        response.cookie('access_token', access_token,{
            httpOnly: true,
            // sameSite: 'none', //A décommenter quand secure sur true
            secure: false, //En dev nous ne sommes pas en https, mis à false pour l'instant mais à remettre à true pour prod
        })

        response.send('La connexion a réussi.')
    }
}
