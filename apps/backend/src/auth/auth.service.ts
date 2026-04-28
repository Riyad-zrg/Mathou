import { BadRequestException, Injectable, NotFoundException, PreconditionFailedException, UnauthorizedException} from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from 'src/generated/prisma/client.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

interface VerificationTokenPayload {
  sub: number;
  email: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthService {
    constructor(
        private userService : UserService,
        private JWTService : JwtService,
    ){}

    async signUp(email:string, firstname: string, lastname:string): Promise<{ message: string }>{
        const existingUser = await this.userService.findUser({email});

        if(existingUser){
            throw new BadRequestException('Cette adresse e-mail est déjà utilisé par un autre compte.')
        }

        const expiresDate = new Date();
        expiresDate.setMinutes(expiresDate.getMinutes() + 15);

        const temporaryUser = await this.userService.createUser({
            email : email,
            firstname : firstname,
            lastname : lastname,
            password:  Math.random().toString(36).substring(2, 12),
            isEmailVerified: false,
            emailVerifExpires : expiresDate,
        })

        const verificationToken = this.generateVerificationToken(temporaryUser);

        await resend.emails.send({
            from: 'Socatoa <noreply@contact.socatoa.eu>',
            to: email,
            subject: 'Confirmation d\'adresse e-mail',
            text: `Voici le lien pour vérifier votre adresse e-mail : http://localhost:3000/signup/verify?verification_token=${verificationToken}`,
        })

        return ({message: 'Merci de vérifier votre adresse e-mail.'});
    }

    async verifyEmail(token : string): Promise<{message:string}>{
            const decoded = this.JWTService.verify<VerificationTokenPayload>(token); 
            const user = await this.userService.findUser({id : +decoded.sub})

            if(!user){
                throw new UnauthorizedException('Invalid token');
            }

            if(user.isEmailVerified){
                throw new UnauthorizedException('Email already verified');
            }

            if(!user.emailVerifExpires){
                throw new PreconditionFailedException('Missing data in token.')
            }

            if(
                user.emailVerifExpires &&
                user.emailVerifExpires < new Date()
            ){
                await this.userService.deleteUser({id: +decoded.sub});
                throw new UnauthorizedException(
                    'The verification link has expired. Please sign up again.',
                );
            }

            await this.userService.updateUser({data:{isEmailVerified:true}, where:{id:+decoded.sub}});

            return ({message: 'Le compte a bien été vérifié.'})
    }

    async choosePassword(email:string, password:string, confirmPassword:string):Promise<{message:string}>{
        if(password!==confirmPassword){
            throw new BadRequestException("Les mots de passe ne correspondent pas.")
        }

        const user = await this.userService.findUser({email:email});

        if(!user){
            throw new UnauthorizedException('L\'adresse e-mail fourni est incorrect.');
        }

        if(!user.isEmailVerified){
            throw new UnauthorizedException('Vous devez vérifier votre compte avant de pouvoir choisir un mot de passe.');
        }

        password = this.userService.hashPassword(password);

        await this.userService.updateUser({data: {password:password}, where: {email:email}})

        return({message:"Le mot de passe à bien été enregistré."})
    }

    async signIn(email: string, incomingPassword: string, response: Response): Promise<void>{
        const user = await this.userService.findUser({email: email});

        if(!user){
            throw new NotFoundException('Aucun utilisateur avec cette adresse e-mail n\'a été trouvé.');
        }

        if(!user.isEmailVerified){
            throw new UnauthorizedException('Merci de bien vouloir vérifier votre compte pour pouvoir accéder à l\'application.')
        }

        const match = await bcrypt.compare(incomingPassword, user.password);

        if(!match){
            throw new UnauthorizedException('Le mot de passe renseigné est incorrect.');
        }

        const payload = { sub: user?.id, email: user?.email, firstname: user?.firstname}

        const access_token = await this.JWTService.signAsync(payload);

        response.cookie('access_token', access_token,{
            httpOnly: true,
            // sameSite: 'none', //A décommenter quand secure sur true
            secure: false, //En dev nous ne sommes pas en https, mis à false pour l'instant mais à remettre à true pour prod
            maxAge: 1000 * 60 * 15,
        })

        response.send('La connexion a réussi.')
    }

    private generateVerificationToken(user: User): string {
        const payload = {sub: user.id, email: user.email};

        return this.JWTService.sign(payload, {
            expiresIn: '15m', 
        });
    }
}
